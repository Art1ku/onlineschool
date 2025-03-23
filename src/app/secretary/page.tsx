"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Secretary.module.scss";
import { $url } from "@/api/api";
import useAuthStore from "@/store/authStore";

interface NewsItem {
    id: number;
    newsTitle: string;
    newsContent: string;
    username: string;
    imageUrl?: string;
}

interface FormState {
    newsTitle: string;
    newsContent: string;
    username: string;
    image: File | null;
}

export default function Secretary() {
    const { token } = useAuthStore(); // Получаем токен из Zustand
    const [news, setNews] = useState<NewsItem[]>([]);
    const [form, setForm] = useState<FormState>({
        newsTitle: "",
        newsContent: "",
        username: "",
        image: null,
    });
    const router = useRouter();

    useEffect(() => {
        if (!token) return; // Не запрашиваем данные, если нет токена

        const fetchNews = async () => {
            try {
                const response = await fetch(`${$url}/api/v1/news/detAllNews`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response:", errorText);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched news:", data);
                setNews(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching news", error);
                setNews([]);
            }
        };

        fetchNews();
    }, [token]);

    // Обновление состояния формы
    const updateForm = (key: keyof FormState, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    // Функция добавления новости
    const addNews = async () => {
        if (!form.newsTitle.trim() || !form.newsContent.trim() || !form.username.trim()) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            const response = await fetch(`${$url}/api/v1/news/addNews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    newsTitle: form.newsTitle,
                    newsContent: form.newsContent,
                    username: form.username,
                }),
            });

            if (!response.ok) throw new Error(`Failed to send news: ${response.statusText}`);

            const newsData = await response.json();
            let imageUrl = "";

            // Загрузка изображения, если оно выбрано
            if (form.image) {
                const formData = new FormData();
                formData.append("file", form.image);

                const imageResponse = await fetch(`${$url}/api/v1/news/${newsData.id}/image`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!imageResponse.ok) throw new Error("Failed to upload image");
                imageUrl = `${$url}/api/v1/minio/download/${form.image.name}`;
            }

            // Обновление списка новостей
            setNews((prevNews) => [...prevNews, { ...newsData, imageUrl }]);
            setForm({ newsTitle: "", newsContent: "", username: "", image: null });
            console.log("News added successfully", newsData);
        } catch (error) {
            console.error("Error sending news", error);
        }
    };

    return (
        <div className={styles.fullscreenContainer}>
            <button className={styles.homeButton} onClick={() => router.push("/")}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10L12 3L21 10V21H14V14H10V21H3V10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className={styles.leftPanel}>
                <h1 className={styles.title}>Secretary cabinet</h1>
                <div className={styles.newsGrid}>
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <div key={item.id} className={index % 2 === 0 ? styles.largeNewsItem : styles.smallNewsItem}>
                                {item.imageUrl && <img src={item.imageUrl} alt={item.newsTitle} className={styles.newsImage} />}
                                <h3>{item.newsTitle}</h3>
                                <p>{item.newsContent}</p>
                                <p><strong>Author:</strong> {item.username}</p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noNews}>No news available</p>
                    )}
                </div>
            </div>
            <div className={styles.rightPanel}>
                <h2 className={styles.MainTitle}>Add News</h2>
                <div className={styles.form}>
                    <input
                        className={styles.input}
                        placeholder="Title"
                        value={form.newsTitle}
                        onChange={(e) => updateForm("newsTitle", e.target.value)}
                    />
                    <textarea
                        className={styles.textarea}
                        placeholder="Text"
                        value={form.newsContent}
                        onChange={(e) => updateForm("newsContent", e.target.value)}
                    />
                    <input
                        className={styles.input}
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => updateForm("username", e.target.value)}
                    />
                    <input
                        type="file"
                        className={styles.fileInput}
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            updateForm("image", file);
                        }}
                    />
                    <button className={styles.addButton} onClick={addNews}>Add News</button>
                </div>
            </div>
        </div>
    );
}
