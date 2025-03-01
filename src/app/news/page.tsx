'use client'
import { useEffect, useState } from "react";
import styles from "./News.module.scss";
import Container from "@/components/base/Container/Container";
import { $url } from "@/api/api";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

interface NewsItem {
  newsTitle: string;
  newsContent: string;
  username: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${$url}/api/v1/news/detAllNews`);
        if (!response.ok) throw new Error("Не удалось загрузить новости");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Ошибка при загрузке новостей", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1 className={styles.mainTitle}>News</h1>
        <div className={styles.newsGrid}>
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div className={styles.newsCard} key={index}>
                  <div className={styles.placeholderImage}></div>
                  <div className={styles.placeholderContent}>
                    <div className={styles.placeholderTitle}></div>
                    <div className={styles.placeholderText}></div>
                  </div>
                </div>
              ))
          ) : (
            news.length > 0 &&
            news.map((item, index) => (
              <div className={styles.newsCard} key={index}>
                <div className={styles.newsContent}>
                  <h3 className={styles.newsTitle}>{item.newsTitle}</h3>
                  <p className={styles.newsText}>{item.newsContent}</p>
                  <span className={styles.newsAuthor}>By: {item.username}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
