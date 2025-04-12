"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Secretary.module.scss";
import { $api, $url } from "@/api/api";
import { useAuthStore } from "@/store/userStore";

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
    const [news, setNews] = useState<NewsItem[]>([]);
    const [form, setForm] = useState<FormState>({
        newsTitle: "",
        newsContent: "",
        username: "",
        image: null,
    });
    const router = useRouter();
    const token = localStorage.getItem("accessToken");
    console.log(token);
    
    const updateForm = (key: keyof FormState, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const addNews = async () => {
        if (!form.newsTitle.trim() || !form.newsContent.trim() || !form.username.trim()) {
            alert("Please fill in all fields!");
            return;
        }

        // Проверяем, что изображение не пустое, если оно необходимо
        if (!form.image) {
            alert("Please select an image!");
            return;
        }

        try {
            // Сначала создаём новость
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

            if (!response.ok) {
                throw new Error("Ошибка при создании новости");
            }

            const newsData = await response.json();
            console.log("Новость успешно сохранена:", newsData);
            if (form.image) {
                const imageForm = new FormData();
                imageForm.append("image", form.image);
                console.log(newsData.id);
                
                const imageResponse = await fetch(
                    `${$url}/api/v1/news/images/${newsData.id}/image`, 
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: imageForm,
                    }
                );

                if (!imageResponse.ok) {
                    throw new Error("Ошибка при загрузке изображения");
                }

                const imageResult = await imageResponse.text();
                console.log("Изображение успешно загружено:", imageResult);

                newsData.imageUrl = imageResult;
            }

            setNews((prevNews) => [...prevNews, newsData]);
            setForm({ newsTitle: "", newsContent: "", username: "", image: null });
        } catch (error) {
            console.error("Ошибка при добавлении новости:", error);
            alert("Ошибка при добавлении новости или изображение не было загружено!");
        }
    };

    return (
        <div className={styles.fullscreenContainer}>
            <button className={styles.homeButton} onClick={() => router.push("/")}>Home</button>
            <div className={styles.leftPanel}>
                <h1 className={styles.title}>Secretary cabinet</h1>

                {news.length > 0 ? (
                    news.map((item) => (
                        <div key={item.id} className={styles.newsItem}>
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
            <div className={styles.rightPanel}>
                <h2 className={styles.MainTitle}>Add News</h2>
                <div className={styles.form}>
                    <input className={styles.input} placeholder="Title" value={form.newsTitle} onChange={(e) => updateForm("newsTitle", e.target.value)} />
                    <textarea className={styles.textarea} placeholder="Text" value={form.newsContent} onChange={(e) => updateForm("newsContent", e.target.value)} />
                    <input className={styles.input} placeholder="Username" value={form.username} onChange={(e) => updateForm("username", e.target.value)} />
                    <input type="file" className={styles.fileInput} accept="image/*" onChange={(e) => updateForm("image", e.target.files?.[0] || null)} />
                    <button className={styles.addButton} onClick={addNews}>Add News</button>
                </div>
            </div>
        </div>
    );
}
