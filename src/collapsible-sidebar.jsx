import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IconButtonCol from './icon-button-col';

export default function CollapsibleSidebar({ buttons = [] }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div
            className={`fixed transform top-0 left-0 h-full flex flex-col justify-between transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-16' : 'w-0'}`}
        >
            <IconButtonCol buttons={buttons} />
            <button
                onClick={toggleCollapse}
                className="p-2 hover:bg-gray-200 rounded-tr-md rounded-br-md transition self-end"
            >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
        </div>
    );
}
