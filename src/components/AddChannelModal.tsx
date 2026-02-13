import { X, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { categories } from '../data';

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddChannelModal({ isOpen, onClose }: AddChannelModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    category: '',
    description: '',
    url: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Введите название канала';
    if (!formData.username.trim()) errs.username = 'Введите username';
    else if (!formData.username.startsWith('@')) errs.username = 'Username должен начинаться с @';
    if (!formData.category) errs.category = 'Выберите категорию';
    if (!formData.description.trim()) errs.description = 'Добавьте описание';
    else if (formData.description.trim().length < 20) errs.description = 'Описание слишком короткое (мин. 20 символов)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', username: '', category: '', description: '', url: '' });
      setErrors({});
      onClose();
    }, 2500);
  };

  const handleClose = () => {
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#12122a] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header gradient */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600" />

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Добавить канал</h2>
              <p className="text-sm text-slate-500 mt-0.5">Отправьте ваш канал на модерацию</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
                <Send className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Заявка отправлена!</h3>
              <p className="text-sm text-slate-500 mb-1">Ваш канал будет проверен модераторами</p>
              <p className="text-xs text-slate-400">Обычно модерация занимает 1-2 рабочих дня</p>
              <div className="mt-6 w-full bg-slate-100 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-[progress_2.5s_ease-in-out]" style={{ width: '100%' }} />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Название канала <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="MAX Новости"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all`}
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="@mychannel"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border ${errors.username ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all`}
                />
                {errors.username && (
                  <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Ссылка на канал
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://max.me/mychannel"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Категория <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border ${errors.category ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all`}
                >
                  <option value="">Выберите категорию</option>
                  {categories.filter(c => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Описание <span className="text-red-500">*</span>
                  <span className="text-xs text-slate-400 ml-2">{formData.description.length}/500</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value.slice(0, 500) })}
                  placeholder="Расскажите о вашем канале подробно..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border ${errors.description ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none`}
                />
                {errors.description && (
                  <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-white/[0.02] rounded-xl p-4 border border-slate-200 dark:border-white/5">
                <p className="text-xs text-slate-500 leading-relaxed">
                  📋 После отправки заявки наши модераторы проверят канал на соответствие правилам каталога.
                  Модерация обычно занимает 1-2 рабочих дня. Вы получите уведомление о результате.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Отправить на модерацию
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
