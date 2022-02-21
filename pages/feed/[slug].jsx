import styles from '../../styles/pages/Feed.module.css';
import { useRouter } from 'next/router';
import Toolbar from '../../components/Toolbar';

const Feed = ({ pageNumber, articles }) => {
    const router = useRouter();
    return (
        <div className="page-conatiner">
            <Toolbar />
            <div className={styles.main}>
                {articles.map((article, index) => (
                    <div className={styles.post} key={index}>
                        <h1 onClick={() => { window.location.href = article.url }}>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} alt="" />}
                    </div>
                ))}
            </div>
            <div className={styles.paginator}>
                <div
                    onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`)
                        }
                    }}
                    className={pageNumber == 1 ? styles.disabled : styles.active}
                >
                    Previous Page
                </div>
                <div>page {pageNumber}</div>
                <div
                    onClick={() => {
                        if (pageNumber < 5) {
                            router.push(`/feed/${pageNumber + 1}`)
                        }
                    }}
                    className={pageNumber == 5 ? styles.disabled : styles.active}
                >
                    Next Page
                </div>
            </div>
        </div>
    )
}

export default Feed

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.slug;

    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            },
        };
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
            },
        },
    ).then(res => res.json());

    const { articles } = apiResponse;

    return {
        props: {
            articles: articles,
            pageNumber: Number.parseInt(pageNumber),
        },
    };
};