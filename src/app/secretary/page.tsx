"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Secretary.module.scss";
import { $api, $url } from "@/api/api";


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
    const token = localStorage.getItem("accessToken");
    const [news, setNews] = useState<NewsItem[]>([]);
    const [form, setForm] = useState<FormState>({
        newsTitle: "",
        newsContent: "",
        username: "",
        image: null,
    });
    const router = useRouter();

    const updateForm = (key: keyof FormState, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };
    console.log("token:======== " + token);
    

    const addNews = async () => {
        if (!form.newsTitle.trim() || !form.newsContent.trim() || !form.username.trim()) {
            alert("Please fill in all fields!");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("newsTitle", form.newsTitle);
            formData.append("newsContent", form.newsContent);
            formData.append("username", form.username);
            if (form.image) {
                formData.append("file", form.image);
            }
    
            const response = await fetch(`${$url}/api/v1/news/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formData,
            });
    
            const newsData = await response.json();
    
            setNews((prevNews) => [...prevNews, newsData]);
            setForm({ newsTitle: "", newsContent: "", username: "", image: null });
    
            console.log("News added successfully", newsData);
        } catch (error) {
            console.error("Error sending news", error);
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
                    <input type="file" className={styles.fileInput} accept="image/" onChange={(e) => updateForm("image", e.target.files?.[0] || null)} />
                    <button className={styles.addButton} onClick={addNews}>Add News</button>
                </div>
            </div>
        </div>
    );
}