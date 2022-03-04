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

export const restApi = async ({ url, method = init.method, headers = init.headers, body }: Params) => {
  try {
    const res = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
