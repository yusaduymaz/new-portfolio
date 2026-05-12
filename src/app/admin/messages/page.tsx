import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Message } from '@/types/database';
import { toggleMessageReadStatus, deleteMessage } from './actions';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const supabase = createClient();
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p className="text-error">Mesajlar yüklenemedi.</p>;
  }

  const unreadCount = messages?.filter(m => !m.is_read).length || 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-headline-md text-headline-md text-primary">Gelen Mesajlar</h2>
            {unreadCount > 0 && (
              <span className="bg-secondary text-on-secondary text-xs px-2.5 py-1 rounded-full font-label-md">
                {unreadCount} Okunmamış
              </span>
            )}
          </div>
          <p className="font-body-md text-on-surface-variant mt-1">İletişim formundan gönderilen tüm mesajları yönetin.</p>
        </div>
      </div>

      {messages && messages.length > 0 ? (
        <div className="flex flex-col gap-4">
          {messages.map((msg: Message) => (
            <div 
              key={msg.id} 
              className={`glass-panel p-6 rounded-2xl transition-all duration-300 border-l-4 ${
                msg.is_read ? 'border-outline-variant/30 opacity-75' : 'border-secondary shadow-md'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md ${
                    msg.is_read ? 'bg-surface-variant text-on-surface-variant' : 'bg-secondary/20 text-secondary font-bold'
                  }`}>
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-primary flex items-center gap-2">
                      {msg.name}
                      {!msg.is_read && (
                        <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span>
                      )}
                    </h3>
                    <a href={`mailto:${msg.email}`} className="font-body-sm text-secondary hover:underline">
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="font-label-md text-xs text-on-surface-variant/60">
                    {formatDate(msg.created_at)}
                  </span>
                  
                  <form action={toggleMessageReadStatus.bind(null, msg.id, msg.is_read)}>
                    <button 
                      type="submit" 
                      title={msg.is_read ? "Okunmamış olarak işaretle" : "Okundu olarak işaretle"}
                      className={`p-2 rounded-xl transition-colors ${
                        msg.is_read 
                          ? 'text-on-surface-variant hover:text-primary hover:bg-surface-variant/50' 
                          : 'text-secondary hover:bg-secondary/10 font-bold'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {msg.is_read ? 'mark_as_unread' : 'mark_email_read'}
                      </span>
                    </button>
                  </form>

                  <form action={deleteMessage.bind(null, msg.id)}>
                    <button 
                      type="submit" 
                      title="Mesajı sil"
                      className="p-2 rounded-xl text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </form>
                </div>
              </div>
              <p className="font-body-md text-on-surface whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">mail</span>
          <p className="font-body-md text-on-surface-variant">Henüz gelen bir mesaj bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
