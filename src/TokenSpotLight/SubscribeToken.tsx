import { createSignal } from 'solid-js';
import { z } from 'zod';

import { useSubscribeToken } from '../services/useCabalService';
import { Button, Card, Input } from '../uiKit';

const schema = z.object({
  apiKey: z.string().min(1, 'required'),
});

const SubscribeToken = () => {
  const subscribeToken = useSubscribeToken();

  const [mint, setMint] = createSignal('');
  const [error, setError] = createSignal('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const result = schema.safeParse({ apiKey: mint() });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError('');
    subscribeToken(mint());
  };

  const handleOnInput = (e: Event & { currentTarget: HTMLInputElement }) =>
    setMint(e.currentTarget.value);

  return (
    <Card>
      <div class="flex">
        <div class="flex flex-1">
          <Input
            cn="flex-1 w-300"
            value={mint()}
            onInput={handleOnInput}
            placeholder="mint"
          />
        </div>
        <div class="w-100 pl-4">
          <Button disabled={!mint()} onClick={handleSubmit}>
            Subscribe
          </Button>
        </div>
      </div>
      <div class="text-white">7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr</div>
    </Card>
  );
};

export default SubscribeToken;
