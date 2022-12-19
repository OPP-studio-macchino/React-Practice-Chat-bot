import * as admin from "firebase-admin";
import * as functionsV1 from "firebase-functions/v1";
import * as functionsV2 from "firebase-functions/v2";

admin.initializeApp();

const db = admin.firestore();


const sendResponse = (response: functionsV2.Response, statusCode: number, body: any) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    });
};


export const addDataset = functionsV2.https.onRequest(
    async(req: any, res: any) => {
        if (req.method !== "POST") {
                        sendResponse(res, 405, { error: "Invalid Request" });
                    } else {
                        const dataset = req.body;
                        for (const key of Object.keys(dataset)) {
                            const data = dataset[key];
                            await db.collection("questions").doc(key).set(data);
                        }
                        sendResponse(res, 200, {
                            message: "Successfully added dataset! WooHoo!",
                        });
                    }
    });