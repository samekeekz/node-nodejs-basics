const parseEnv = () => {
    const environmentVariables = process.env;

    const rssVariables = Object.entries(environmentVariables)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    console.log(rssVariables);
};

parseEnv();
