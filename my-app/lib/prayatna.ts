export default async function fetchFooter() {
    const footer = await fetch(
        "http://13.48.136.54:8000/api/api-code/",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer c254f87f-f4a9-4eeb-be38-204e77ea61f9`,
            }
        }
    )
        .then((res) => res.json())
        .catch((e) => console.log(e));

    return footer;
}

fetchFooter().then((footer) => {
    console.log(footer);
});