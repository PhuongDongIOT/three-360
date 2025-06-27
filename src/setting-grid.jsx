import { Settings, Bell, User, ShieldCheck } from 'lucide-react';

const settings = [
  { icon: <Settings size={32} />, title: 'General', desc: 'Basic preferences' },
  { icon: <Bell size={32} />, title: 'Notifications', desc: 'Manage alerts' },
  { icon: <User size={32} />, title: 'Profile', desc: 'Personal info' },
  { icon: <ShieldCheck size={32} />, title: 'Security', desc: 'Privacy settings' },
];

export default function SettingGrid() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {settings.map((item, index) => (
        <div
          key={index}
          className="shadow-inner bg-white/80 rounded-2xl p-4 flex items-start gap-4 hover:shadow-lg transition-all"
        >
          <div className="text-cyan-500">{item.icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
