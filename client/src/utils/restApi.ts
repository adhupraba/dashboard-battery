type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

type Params = {
  url: string;
  method?: Method;
  headers?: HeadersInit;
  body?: BodyInit;
};

const init = {
  method: "POST" as Method,
  headers: {
    "Content-Type": "application/json",
  } as HeadersInit,
};

export const restApi = async ({ url, method, headers, body }: Params) => {
  try {
    console.log({ headers });

    const res = await fetch(url, {
      method,
      headers,
      body,
    });

    const data = await res.json();

    if (data?.errors?.length) {
      throw data.errors;
    }

    return data;
  } catch (err: any) {
    throw err;
  }
};
