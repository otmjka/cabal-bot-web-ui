import { createSignal } from 'solid-js';
import { z } from 'zod';

import { setUserSettings } from '../../stores/userSettings';

import { Input, Button } from '../../uiKit';

const schema = z.object({
  apiKey: z.string().min(1, 'required'),
});

export type ApiKeyWidgetFormValues = { apiKey: string };

const ApiKeyWidget = () => {
  const [apiKey, setApiKey] = createSignal('');
  const [error, setError] = createSignal('');

  const handleApiKeyWidgetSubmit = ({ apiKey }: ApiKeyWidgetFormValues) => {
    setUserSettings('apiKey', apiKey);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const result = schema.safeParse({ apiKey: apiKey() });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError('');
    handleApiKeyWidgetSubmit({ apiKey: apiKey() });
  };

  const handleOnInput = (e: Event & { currentTarget: HTMLInputElement }) =>
    setApiKey(e.currentTarget.value);
  console.log();
  return (
    <form onSubmit={handleSubmit}>
      <div class="flex justify-center">
        <div class="text-2xl">To start enter an API key: </div>
      </div>
      <div class="flex justify-center mt-4 w-full">
        <Input
          cn="focus:bg-black focus:text-green-400"
          type="text"
          name="name"
          placeholder="key 427P1H3..."
          value={apiKey()}
          onInput={handleOnInput}
        />
      </div>
      <div class="flex justify-center mt-4 w-full">
        <Button type="submit" disabled={!apiKey()}>
          Start Hustle!
        </Button>
      </div>
    </form>
  );
};

export default ApiKeyWidget;
