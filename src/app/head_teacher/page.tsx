'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './Head_teacher.module.scss'

export default function HeadTeacher() {
    const [news, setNews] = useState<{ title: string; text: string; img: string }[]>([]);
    const [form, setForm] = useState({ title: "", text: "", img: "" });
    const router = useRouter();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("", { method: "GET" });
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error("Error fetching news", error);
            }
        };
        fetchNews();
    }, []);

    const updateForm = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateForm("img", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addNews = async () => {
        const newNews = { ...form };
        setNews([...news, newNews]);
        setForm({ title: "", text: "", img: "" });

        try {
            const response = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNews),
            });
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
                <h1 className={styles.title}>Head Teacher News</h1>
                <div className={styles.newsGrid}>
                    {news.map((item, index) => (
                        <div key={index} className={index % 2 === 0 ? styles.largeNewsItem : styles.smallNewsItem}>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                            {item.img && <img src={item.img} alt={item.title} className={styles.newsImage} />}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.rightPanel}>
                <h2 className={styles.MainTitle}>Add News</h2>
                <div className={styles.form}>
                    <input 
                        className={styles.input} 
                        placeholder="Title" 
                        value={form.title} 
                        onChange={(e) => updateForm("title", e.target.value)}
                    />
                    <textarea 
                        className={styles.textarea} 
                        placeholder="Text" 
                        value={form.text} 
                        onChange={(e) => updateForm("text", e.target.value)}
                    />
                    {/* Замена поля URL на кнопку для загрузки изображения */}
                    <label htmlFor="image-upload" className={styles.uploadButton}>
                        Upload Image
                    </label>
                    <input 
                        id="image-upload" 
                        type="file" 
                        accept="image/*" 
                        style={{ display: "none" }} 
                        onChange={handleImageChange} 
                    />
                    <button className={styles.addButton} onClick={addNews}>Add News</button>
                </div>
            </div>
        </div>
    );
}
