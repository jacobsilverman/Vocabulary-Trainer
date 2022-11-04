// https://dev.to/mcnaveen/i-made-an-free-api-to-get-random-words-with-pronunciation-127o
export const getRandomWord = () => {
    return fetch("https://random-words-api.vercel.app/word")
    .then((res) => res.json())
    .then((data) => data[0])
    .catch((err) => console.log("can't get random word: ", err))
}