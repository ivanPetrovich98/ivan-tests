export const POST_TOF = async (
    postUrl: string,
    stringifiedData: string,
    setResponse: React.Dispatch<React.SetStateAction<any>>,
    testing: boolean
) => {
    try {
        const response: Response = await fetch(postUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: stringifiedData, // body data type must match "Content-Type" header
        });
        if (testing) console.log('response');
        const json = await response.json();
        if (testing) console.warn('RESPONSE');
        if (testing) console.log(json);
        setResponse(json);
    } catch (e) {
        throw new Error(`Error in JSONPOST: ${e}`);
    }
};
