import OpenAI from 'openai';

const getSummary = async (body: string) => {
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
        dangerouslyAllowBrowser: true,
    });
    const prompt = `Summarize this proposal in up to 120 caracters. Exclude emojis and special characters that might conflict with URLs. Omit any, dont use emojis Content, dont use hashtags, ignore links and optimize the text for SEO: ${body}`;
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
    });
    const summary = response.choices[0]?.message?.content || '';
    return summary;
};


export default getSummary;