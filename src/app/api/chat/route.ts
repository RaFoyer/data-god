import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful data analysis assistant with access to Code Interpreter.',
      },
      ...messages,
    ],
    functions: [
      {
        name: 'analyze_data',
        description: 'Analyze uploaded dataset using Code Interpreter',
        parameters: {
          type: 'object',
          properties: {
            file_path: {
              type: 'string',
              description: 'Path to the uploaded file',
            },
            analysis_type: {
              type: 'string',
              enum: ['descriptive', 'inferential', 'predictive'],
              description: 'Type of analysis to perform',
            },
          },
          required: ['file_path', 'analysis_type'],
        },
      },
    ],
    function_call: 'auto',
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}