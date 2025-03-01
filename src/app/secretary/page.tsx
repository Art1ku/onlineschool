'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Secretary.module.scss";
import { $url } from "@/api/api";

export default function Secretary() {
    const [news, setNews] = useState<{ newsTitle: string; newsContent: string; username: string }[]>([]);
    const [form, setForm] = useState({ newsTitle: "", newsContent: "", username: "" });
    const router = useRouter();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${$url}/api/v1/news/getAllNews`, { method: "GET" });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const data = await response.json();
                console.log("Fetched news:", data);

                // Проверяем, является ли data массивом, если нет — устанавливаем пустой массив
                setNews(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching news", error);
                setNews([]); // Подстраховка, чтобы `news.map` не вызывал ошибку
            }
        };
        fetchNews();
    }, []);

    const updateForm = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const addNews = async () => {
        if (!form.newsTitle.trim() || !form.newsContent.trim() || !form.username.trim()) {
            alert("Please fill in all fields!");
            return;
        }

        const newNews = { ...form };

        setNews(prevNews => [...prevNews, newNews]);
        setForm({ newsTitle: "", newsContent: "", username: "" });

        try {
            const response = await fetch(`${$url}/api/v1/news/addNews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNews),
            });

            if (!response.ok) throw new Error(`Failed to send news: ${response.statusText}`);

            console.log("News sent to API", await response.json());
        } catch (error) {
            console.error("Error sending news", error);
        }
    };

    return (
        <div className={styles.fullscreenContainer}>
            <button className={styles.homeButton} onClick={() => router.push("/")}> 
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10L12 3L21 10V21H14V14H10V21H3V10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <div className={styles.leftPanel}>
                <h1 className={styles.title}>Secretary cabinet</h1>
                <div className={styles.newsGrid}>
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <div key={index} className={index % 2 === 0 ? styles.largeNewsItem : styles.smallNewsItem}>
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
                    <button className={styles.addButton} onClick={addNews}>Add News</button>
                </div>
            </div>
        </div>
    );
}
