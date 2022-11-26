export const GET_TOF = async (
    fetchUrl: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    testing: boolean
) => {
    try {
        if (testing) console.log(`Loading Data`);
        if (testing) console.log(`fetchUrl: ${fetchUrl}`);

        const response: Response = await fetch(fetchUrl);
        const json = await response.json();

        if ('errorMessage' in json) {
            console.log(json.errorMessage);
            throw json.errorMessage;
        }

        if (testing) console.log(`Setting data in Button Fetch`);
        if (testing) console.log(json);
        setData(json);
    } catch (e) {
        throw new Error(`Error in JSONGET: ${e}`);
    }
};
