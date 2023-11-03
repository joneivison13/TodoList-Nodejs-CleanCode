import insomia from "../../docs/insomnia.json";
const swaggerDocument = (routes: any) => ({
  openapi: "3.0.0",
  info: {
    title: "TO-DO LIST - Express API",
    version: "1.0.0",
    description: "This is a rest api for task management",
  },
  servers: [
    {
      url: "http://localhost:3333/api/v1.0",
      description: "Development server",
    },
  ],
  paths: routes,
  components: {
    schemas: {},
  },
});

export default () => {
  let routes = {};

  for (let i = 0; i < insomia.resources.length; i++) {
    const element = insomia.resources[i];
    let route = {};
    if (
      element.method === "GET" ||
      element.method === "POST" ||
      element.method === "PUT" ||
      element.method === "DELETE"
    ) {
      let path = "/";
      if (element.url.includes("http")) {
        const url = new URL(element.url);
        path = url.pathname;
      } else {
        const pathname = element.url
          .split("/")
          .slice(1, element.url.split("/").length)
          .join("/");
        path = pathname.length >= 1 ? "/" + pathname : "/";
      }

      route = {
        ...route,
        [path]: {
          [element.method.toLowerCase()]: {
            summary: element.name,
            description: element.description,
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  example: element.body.text,
                },
              },
            },
            responses: {
              "200": {
                description: "OK",
              },
            },
          },
        },
      };
    }
    routes = { ...routes, ...route };
  }

  return swaggerDocument(routes);
};
