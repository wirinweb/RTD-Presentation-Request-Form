import React, { useState } from 'react';
import InputField from './components/InputField';
import Checkbox from './components/Checkbox';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    organization: '',
    position: '',
    comment: '',
    consentData: true,
    consentNewsletter: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
     setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- Telegram Bot Integration ---
    // IMPORTANT: Storing a real bot token in frontend code is a major security risk.
    // Anyone can find it and control your bot. In a real application, this API call
    // should be made from a backend server where the token can be kept secret.
    // 1. Create a bot with @BotFather on Telegram to get a token.
    // 2. Start a chat with your new bot.
    const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; 
    const CHAT_ID = '@Sergey_Voroshnin'; // Your Telegram username

    const message = `
*Запрос презентации с сайта*

${formData.name || 'Имя не указано'}
${formData.email || 'Email не указан'}
${formData.phone || 'Телефон не указан'}

${formData.region || 'Регион не указан'}
${formData.organization || 'Организация не указана'}
${formData.position || 'Должность не указана'}

${formData.comment || 'Комментарий отсутствует'}
    `.trim().replace(/\n\s*\n/g, '\n\n'); // Clean up extra whitespace for formatting

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const result = await response.json();

      if (result.ok) {
        alert('Спасибо! Ваша заявка успешно отправлена в Telegram.');
      } else {
        alert(`Произошла ошибка при отправке: ${result.description}. Убедитесь, что BOT_TOKEN указан верно и вы начали диалог с ботом.`);
      }
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      alert('Не удалось отправить заявку. Проверьте консоль для получения дополнительной информации.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1976D2] text-white font-sans flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Запросить презентацию
          </h1>
          <p className="text-base text-gray-200 mb-12 max-w-2xl">
            Мы отправим презентацию на вашу почту в течение двух рабочих дней. Если письмо не пришло — проверьте, пожалуйста, папку «Спам».
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-10">
              <InputField id="name" name="name" label="Как к вам обращаться" value={formData.name} onChange={handleChange} />
              <InputField id="email" name="email" label="Эл. почта" type="email" value={formData.email} onChange={handleChange} />
              <InputField id="phone" name="phone" label="Телефон" type="tel" value={formData.phone} onChange={handleChange} />
              <InputField id="region" name="region" label="Регион" value={formData.region} onChange={handleChange} />
              <InputField id="organization" name="organization" label="Организация" value={formData.organization} onChange={handleChange} />
              <InputField id="position" name="position" label="Должность" value={formData.position} onChange={handleChange} />
              <div className="md:col-span-2 lg:col-span-3">
                  <label htmlFor="comment" className="block text-sm text-gray-200 mb-2">Комментарий</label>
                  <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleTextareaChange}
                      className="w-full bg-transparent border-b border-gray-400 focus:border-white outline-none transition-colors duration-300 py-2 resize-none"
                      rows={1}
                  />
              </div>
            </div>
            
            <div className="space-y-6 mb-10">
              <Checkbox
                id="consentData"
                name="consentData"
                label="Согласие на обработку персональных данных"
                checked={formData.consentData}
                onChange={handleChange}
              />
              <Checkbox
                id="consentNewsletter"
                name="consentNewsletter"
                label="Согласие на получение рассылки с презентационными материалами"
                checked={formData.consentNewsletter}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="px-10 py-4 bg-[#29B6F6] text-white font-bold rounded-full text-lg hover:bg-[#03A9F4] transition-all duration-300 shadow-[0_0_20px_rgba(41,182,246,0.5)]">
              ОТПРАВИТЬ
            </button>
          </form>
        </div>

        {/* Right Side: Profile Card */}
        <div className="flex-shrink-0 mt-8 lg:mt-0 text-center lg:text-left">
           <div className="inline-block">
             <img src="https://i.ibb.co/n8rZpJJf/1622756636226594753-1.jpg" alt="Сергей Ворошнин" className="w-56 h-auto"/>
           </div>
           <div className="mt-6">
              <h2 className="text-3xl font-bold">Сергей</h2>
              <h2 className="text-3xl font-bold">Ворошнин</h2>
              <p className="text-lg text-gray-200 mt-2">Коммерческий директор</p>
              <a href="mailto:s.voroshnin@doctis.ru" className="text-lg text-gray-200 mt-2 block hover:text-white transition-colors">s.voroshnin@doctis.ru</a>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;