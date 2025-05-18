import { createSignal } from 'solid-js';
import { z } from 'zod';

import { setUserSettings } from '../stores/userSettings';

import { Input } from '../uiKit';
import PaperHeader from './PaperHeader';

const schema = z.object({
  apiKey: z.string().min(1, 'required'),
});

export type UserSettingsFormValues = { apiKey: string };

const UserSettings = () => {
  const [apiKey, setApiKey] = createSignal('');
  const [error, setError] = createSignal('');

  const handleUserSettingsSubmit = ({ apiKey }: UserSettingsFormValues) => {
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
    handleUserSettingsSubmit({ apiKey: apiKey() });
  };

  const handleOnInput = (e: Event & { currentTarget: HTMLInputElement }) =>
    setApiKey(e.currentTarget.value);

  return (
    <form onSubmit={handleSubmit}>
      <div class="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <PaperHeader />

        <div class="space-y-6 bg-white">
          <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 class="max-w-sm md:w-1/3">API KEY</h2>
            <div class="max-w-sm mx-auto md:w-2/3">
              <div class=" relative ">
                <Input
                  type="text"
                  name="name"
                  value={apiKey()}
                  onInput={handleOnInput}
                />
                {error() && <div style={{ color: 'red' }}>{error()}</div>}
              </div>
            </div>
          </div>
          <hr />
          <div class="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              class="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Start Hustle!
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserSettings;
