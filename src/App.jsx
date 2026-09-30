import { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Users, Phone, Video, Settings, Plus, Search,
  Smile, Send, Mic, MoreVertical,
  Play, Pause, X, Check, CheckCheck, Calendar, FileText,
  Music, MapPin, Sparkles, Gamepad2, Moon, Sun, Bell,
  Shield, QrCode, Copy, Camera, Image as ImageIcon,
  Clock, ChevronLeft, VideoOff, MicOff, PhoneOff, Compass,
  Lock, Bookmark
} from 'lucide-react';

const INITIAL_USER = {
  id: 'me',
  name: 'Taranveer Singh',
  username: 'taran',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Building Mingly ✨ | Music & coffee enthusiast ☕ | Design obsessive',
  presence: '🟢 Available',
  customPresence: 'Exploring new tech & mingles',
  joined: 'March 2024',
  minglyLink: 'mingly.app/@taran'
};

const INITIAL_CIRCLES = [
  {
    id: 'c1',
    name: 'College Squad',
    emoji: '🎓',
    color: 'from-blue-600 to-indigo-600',
    description: 'B.Tech CS 2024 batch & project brainstorms',
    memberCount: 14,
    activeStories: 3,
    recentUpdate: 'Final demo day scheduled next Friday!'
  },
  {
    id: 'c2',
    name: 'Close Friends',
    emoji: '✨',
    color: 'from-pink-500 to-rose-600',
    description: 'Late night talks, memes, and weekend plans',
    memberCount: 6,
    activeStories: 5,
    recentUpdate: 'Weekend brunch meetup at Cafe Green'
  },
  {
    id: 'c3',
    name: 'Work Squad',
    emoji: '💻',
    color: 'from-purple-600 to-indigo-700',
    description: 'Frontend sync, releases and tech talk',
    memberCount: 9,
    activeStories: 2,
    recentUpdate: 'v2.4 beta release deployed successfully'
  },
  {
    id: 'c4',
    name: 'Travel Crew 🏔️',
    emoji: '✈️',
    color: 'from-teal-500 to-emerald-600',
    description: 'Manali roadtrip & mountain treks',
    memberCount: 8,
    activeStories: 4,
    recentUpdate: 'Hotel bookings confirmed for Solang Valley'
  }
];

const INITIAL_STORIES = [
  {
    id: 's1',
    userId: 'u1',
    userName: 'Alex Chen',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
    caption: 'Starlit night in Himachal ✨ Freezing but magical!',
    music: 'Sparks - Coldplay',
    circle: 'Travel Crew 🏔️',
    timeAgo: '2h ago',
    viewed: false
  },
  {
    id: 's2',
    userId: 'u2',
    userName: 'Maya Patel',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    caption: 'Live indie concert vibes 🎸 sound check!',
    music: 'Midnight City - M83',
    circle: 'College Squad',
    timeAgo: '4h ago',
    viewed: false
  },
  {
    id: 's3',
    userId: 'u3',
    userName: 'Liam Vance',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    caption: 'Late night coding session. Shipped dark mode UI! 🚀',
    music: 'Lofi Beats - Chillhop',
    circle: 'Work Squad',
    timeAgo: '6h ago',
    viewed: true
  },
  {
    id: 's4',
    userId: 'u4',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    caption: 'Aesthetic bakery morning croissant & matcha latte 🥐🍵',
    music: 'Golden Hour - JVKE',
    circle: 'Close Friends',
    timeAgo: '8h ago',
    viewed: true
  }
];

const INITIAL_MOMENTS = [
  {
    id: 'm1',
    user: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    mood: '☕ Having coffee',
    text: 'Sipping roasted hazelnut cold brew before deep sprint',
    expiresIn: '3h left'
  },
  {
    id: 'm2',
    user: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    mood: '🎧 Listening to music',
    text: 'The Weeknd - After Hours album on loop today',
    expiresIn: '5h left'
  },
  {
    id: 'm3',
    user: 'Liam Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mood: '💻 Working',
    text: 'Refactoring chat state machine in React & Tailwind',
    expiresIn: '1h left'
  },
  {
    id: 'm4',
    user: 'Kavya Sharma',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    mood: '✈️ Travelling',
    text: 'Terminal 3 departure gate 14B heading to Kochi!',
    expiresIn: '8h left'
  }
];

const INITIAL_CONVERSATIONS = [
  {
    id: 'c-alex',
    name: 'Alex Chen',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    presence: '🟢 Available',
    presenceText: 'Working on camera filters',
    lastMessage: 'Check out the new game move!',
    time: '10:42 PM',
    unreadCount: 1,
    pinned: true,
    circle: 'College Squad'
  },
  {
    id: 'c-group-college',
    name: 'College Gang 🎓',
    isGroup: true,
    avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&auto=format&fit=crop&q=80',
    presence: '👥 14 members',
    presenceText: 'Maya, Liam, Kavya active',
    lastMessage: 'Maya: Who has the presentation deck?',
    time: '10:15 PM',
    unreadCount: 3,
    pinned: true,
    circle: 'College Squad'
  },
  {
    id: 'c-maya',
    name: 'Maya Patel',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    presence: '🎧 Listening',
    presenceText: 'The Weeknd — Blinding Lights',
    lastMessage: 'Are we still on for the weekend getaway?',
    time: '9:30 PM',
    unreadCount: 0,
    pinned: false,
    circle: 'Close Friends'
  },
  {
    id: 'c-liam',
    name: 'Liam Vance',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    presence: '💻 Working',
    presenceText: 'Deep coding sprint — Do not disturb',
    lastMessage: 'Shared note updated with API specs.',
    time: 'Yesterday',
    unreadCount: 0,
    pinned: false,
    circle: 'Work Squad'
  },
  {
    id: 'c-travel',
    name: 'Manali Trekkers 🏔️',
    isGroup: true,
    avatar: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=150&auto=format&fit=crop&q=80',
    presence: '👥 8 members',
    presenceText: 'Alex, Taran, Elena',
    lastMessage: 'Check the budget breakdown note!',
    time: 'Yesterday',
    unreadCount: 0,
    pinned: false,
    circle: 'Travel Crew 🏔️'
  }
];

const INITIAL_MESSAGES = {
  'c-alex': [
    {
      id: 'm-1',
      sender: 'alex',
      type: 'text',
      content: 'Hey Taran! Did you check out the new Mingly Circles update?',
      time: '10:30 PM',
      status: 'read',
      reactions: { '❤️': 2, '🔥': 1 }
    },
    {
      id: 'm-2',
      sender: 'me',
      type: 'text',
      content: 'Yes! The private scopes for College and Work are super clean. Love the aesthetic.',
      time: '10:32 PM',
      status: 'read',
      reactions: { '👍': 1 }
    },
    {
      id: 'm-3',
      sender: 'alex',
      type: 'audio',
      audioDuration: '0:28',
      time: '10:35 PM',
      status: 'read',
      reactions: {}
    },
    {
      id: 'm-4',
      sender: 'alex',
      type: 'game',
      gameTitle: 'Tic-Tac-Toe Showdown',
      board: ['X', 'O', 'X', null, 'O', null, null, null, null],
      turn: 'X',
      winner: null,
      time: '10:38 PM',
      status: 'read',
      reactions: { '🎮': 3 }
    },
    {
      id: 'm-5',
      sender: 'alex',
      type: 'text',
      content: 'Your turn in Tic-Tac-Toe! Don’t let me win this time 😉',
      time: '10:40 PM',
      status: 'read',
      reactions: {}
    }
  ],
  'c-group-college': [
    {
      id: 'g-1',
      sender: 'maya',
      senderName: 'Maya Patel',
      type: 'text',
      content: 'Hey gang, don’t forget to RSVP for the weekend hackathon celebration!',
      time: '9:50 PM',
      status: 'read',
      reactions: { '🎉': 4 }
    },
    {
      id: 'g-2',
      sender: 'maya',
      senderName: 'Maya Patel',
      type: 'event',
      eventTitle: 'Hackathon Victory Dinner 🍕',
      date: 'Saturday, Oct 12',
      timeDetail: '7:30 PM IST',
      location: 'The Artisan Kitchen, Sector 26',
      attendees: ['Maya Patel', 'Taranjeet Singh', 'Alex Chen'],
      userStatus: 'going',
      time: '9:52 PM',
      status: 'read',
      reactions: {}
    },
    {
      id: 'g-3',
      sender: 'liam',
      senderName: 'Liam Vance',
      type: 'note',
      noteTitle: 'Project Demo Deliverables 📋',
      items: [
        { text: 'Final pitch deck slides', done: true },
        { text: 'Host live web preview on Vercel', done: true },
        { text: 'Record 2-minute walkthrough clip', done: false }
      ],
      time: '10:10 PM',
      status: 'read',
      reactions: { '👏': 2 }
    }
  ],
  'c-maya': [
    {
      id: 'my-1',
      sender: 'maya',
      type: 'music',
      trackTitle: 'Blinding Lights',
      artist: 'The Weeknd',
      albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&auto=format&fit=crop&q=80',
      time: '9:25 PM',
      status: 'read',
      reactions: { '🔥': 2 }
    },
    {
      id: 'my-2',
      sender: 'maya',
      type: 'text',
      content: 'Vibing to this while organizing photo albums! Listen to this track 🙌',
      time: '9:26 PM',
      status: 'read',
      reactions: {}
    }
  ]
};

function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);
      return savedValue === null ? initialValue : JSON.parse(savedValue);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable or full; the app remains usable in memory.
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'chats' | 'stories' | 'circles' | 'calls'
  const [theme, setTheme] = useLocalStorageState('mingly-theme', 'dark');
  const [conversations, setConversations] = useLocalStorageState('mingly-conversations', INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState('c-alex');
  const [messages, setMessages] = useLocalStorageState('mingly-messages', INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [stories, setStories] = useLocalStorageState('mingly-stories', INITIAL_STORIES);
  const [moments, setMoments] = useLocalStorageState('mingly-moments', INITIAL_MOMENTS);
  const [circles, setCircles] = useLocalStorageState('mingly-circles', INITIAL_CIRCLES);
  const [currentUser, setCurrentUser] = useLocalStorageState('mingly-user', INITIAL_USER);
  const [settings, setSettings] = useLocalStorageState('mingly-settings', {
    readReceipts: true,
    typingIndicator: true,
    twoFactor: false
  });
  const [callHistory, setCallHistory] = useLocalStorageState('mingly-call-history', []);
  const [notifications, setNotifications] = useLocalStorageState('mingly-notifications', [
    { id: 'notification-game', title: 'Alex Chen invited you to a game', time: '10m ago', isRead: false },
    { id: 'notification-reaction', title: 'Maya Patel reacted 🔥 to your status', time: '1h ago', isRead: false },
    { id: 'notification-tasks', title: 'College Squad: 3 new demo deck tasks', time: '3h ago', isRead: false }
  ]);

  // Filter tabs for chats
  const [chatFilter, setChatFilter] = useState('all'); // 'all' | 'unread' | 'groups' | 'circles'

  // Modals & Panels
  const [storyViewer, setStoryViewer] = useState({ isOpen: false, storyIndex: 0 });
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [isCreateMomentOpen, setIsCreateMomentOpen] = useState(false);
  const [isCreateCircleOpen, setIsCreateCircleOpen] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isChatDetailsOpen, setIsChatDetailsOpen] = useState(false);
  const [circleToInvite, setCircleToInvite] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMessageSearchOpen, setIsMessageSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessageQuery, setChatMessageQuery] = useState('');

  // Call simulation state
  const [activeCall, setActiveCall] = useState(null); // { partnerName, partnerAvatar, type: 'voice' | 'video', duration: 0, isMuted: false, isVideoOff: false }

  // Attachment Sheet & Emoji Pickers
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [typingContactName, setTypingContactName] = useState('');
  const [recordTimer, setRecordTimer] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [playingMusicId, setPlayingMusicId] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const messagesEndRef = useRef(null);
  const idSequenceRef = useRef(0);

  const addToast = (text, type = 'info') => {
    const id = `toast-${++idSequenceRef.current}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChatId]);

  useEffect(() => {
    let timer;
    if (activeCall) {
      timer = setInterval(() => {
        setActiveCall(prev => (prev ? { ...prev, duration: prev.duration + 1 } : null));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall]);

  useEffect(() => {
    let timer;
    if (isRecordingAudio) {
      timer = setInterval(() => {
        setRecordTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecordingAudio]);

  const handleSendMessage = (customPayload = null) => {
    if (!customPayload && !inputText.trim()) return;

    const newMsg = customPayload || {
      id: `msg-${++idSequenceRef.current}`,
      sender: 'me',
      type: 'text',
      content: inputText.trim(),
      replyTo: replyingTo ? replyingTo.content : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      reactions: {}
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));

    if (!customPayload) {
      setInputText('');
      setReplyingTo(null);
    }

    // Update conversation snippet
    setConversations(prev =>
      prev.map(c =>
        c.id === activeChatId
          ? {
              ...c,
              lastMessage: newMsg.type === 'text' ? newMsg.content : `[${newMsg.type.toUpperCase()}]`,
              time: 'Just now'
            }
          : c
      )
    );

    // Simulate double ticks after 800ms
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChatId]: (prev[activeChatId] || []).map(m =>
          m.id === newMsg.id ? { ...m, status: 'delivered' } : m
        )
      }));
    }, 800);

    // Simulate auto-reply in Alex's chat
    if (activeChatId === 'c-alex' && !customPayload) {
      if (settings.typingIndicator) setTypingContactName('Alex Chen');
      setTimeout(() => {
        const replyMsg = {
          id: `reply-${Date.now()}`,
          sender: 'alex',
          type: 'text',
          content: 'Got it! Mingly feels super responsive 🚀 Love the real-time feedback.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          reactions: { '💜': 1 }
        };
        setMessages(prev => ({
          ...prev,
          'c-alex': [...(prev['c-alex'] || []), replyMsg]
        }));
        setTypingContactName('');
        addToast('New message from Alex Chen', 'message');
      }, 2500);
    }
  };

  const handleGameMove = (msgId, index) => {
    setMessages(prev => {
      const chatMsgs = prev[activeChatId] || [];
      const updated = chatMsgs.map(m => {
        if (m.id !== msgId || m.board[index] || m.winner) return m;

        const nextBoard = [...m.board];
        nextBoard[index] = m.turn;

        // check winner
        const lines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
        ];
        let winner = null;
        for (let line of lines) {
          const [a, b, c] = line;
          if (nextBoard[a] && nextBoard[a] === nextBoard[b] && nextBoard[a] === nextBoard[c]) {
            winner = nextBoard[a];
            break;
          }
        }
        if (!winner && !nextBoard.includes(null)) {
          winner = 'Draw';
        }

        const nextTurn = m.turn === 'X' ? 'O' : 'X';
        return {
          ...m,
          board: nextBoard,
          turn: nextTurn,
          winner
        };
      });
      return { ...prev, [activeChatId]: updated };
    });
  };

  const handleToggleRSVP = (msgId, choice) => {
    setMessages(prev => {
      const chatMsgs = prev[activeChatId] || [];
      const updated = chatMsgs.map(m => {
        if (m.id !== msgId) return m;
        return {
          ...m,
          userStatus: choice,
          attendees: choice === 'going'
            ? Array.from(new Set([...m.attendees, 'Taranjeet Singh']))
            : m.attendees.filter(name => name !== 'Taranjeet Singh')
        };
      });
      return { ...prev, [activeChatId]: updated };
    });
    addToast(`RSVP status updated: ${choice.toUpperCase()}!`, 'success');
  };

  const handleToggleNoteItem = (msgId, itemIdx) => {
    setMessages(prev => {
      const chatMsgs = prev[activeChatId] || [];
      const updated = chatMsgs.map(m => {
        if (m.id !== msgId) return m;
        const newItems = m.items.map((it, idx) =>
          idx === itemIdx ? { ...it, done: !it.done } : it
        );
        return { ...m, items: newItems };
      });
      return { ...prev, [activeChatId]: updated };
    });
  };

  const handleAddReaction = (msgId, emoji) => {
    setMessages(prev => {
      const chatMsgs = prev[activeChatId] || [];
      const updated = chatMsgs.map(m => {
        if (m.id !== msgId) return m;
        const currentCount = m.reactions?.[emoji] || 0;
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [emoji]: currentCount + 1
          }
        };
      });
      return { ...prev, [activeChatId]: updated };
    });
    addToast(`Reacted with ${emoji}`);
  };

  const handleFinishVoiceRecord = () => {
    setIsRecordingAudio(false);
    const audioMsg = {
      id: `audio-${++idSequenceRef.current}`,
      sender: 'me',
      type: 'audio',
      audioDuration: `0:${recordTimer < 10 ? '0' : ''}${recordTimer || 8}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      reactions: {}
    };
    handleSendMessage(audioMsg);
    addToast('Voice note sent!', 'success');
  };

  const startCall = (type = 'voice', partnerName) => {
    const activeConvo = conversations.find(c => c.name === partnerName)
      || conversations.find(c => c.id === activeChatId)
      || conversations[0];
    if (!activeConvo) return;
    setActiveCall({
      partnerName: activeConvo.name,
      partnerAvatar: activeConvo.avatar,
      type,
      duration: 0,
      isMuted: false,
      isVideoOff: false,
      isSpeakerOn: true
    });
  };

  const selectChat = (id) => {
    setActiveChatId(id);
    setActiveTab('chats');
    setConversations(prev => prev.map(chat => chat.id === id ? { ...chat, unreadCount: 0 } : chat));
  };

  const createConversation = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const id = `chat-${Date.now()}`;
    const newConversation = {
      id,
      name: trimmedName,
      isGroup: false,
      avatar: INITIAL_CONVERSATIONS[0].avatar,
      presence: '🟢 Available',
      presenceText: 'Local conversation',
      lastMessage: 'Say hello to start the conversation',
      time: 'Just now',
      unreadCount: 0,
      pinned: false,
      circle: null
    };
    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({ ...prev, [id]: [] }));
    setIsNewChatOpen(false);
    selectChat(id);
  };

  const openCircleChat = (circle) => {
    const id = `circle-${circle.id}`;
    setConversations(prev => prev.some(chat => chat.id === id) ? prev : [
      {
        id,
        name: circle.name,
        isGroup: true,
        avatar: INITIAL_CONVERSATIONS[1].avatar,
        presence: `👥 ${circle.memberCount} members`,
        presenceText: 'Local circle conversation',
        lastMessage: circle.recentUpdate || 'Start the conversation',
        time: 'Just now',
        unreadCount: 0,
        pinned: false,
        circle: circle.name
      },
      ...prev
    ]);
    setMessages(prev => prev[id] ? prev : { ...prev, [id]: [] });
    selectChat(id);
  };

  const activeChat = conversations.find(c => c.id === activeChatId);
  const currentChatMessages = messages[activeChatId] || [];

  const filteredConversations = conversations.filter(c => {
    const matchesFilter = chatFilter === 'unread' ? c.unreadCount > 0
      : chatFilter === 'groups' ? c.isGroup
      : chatFilter === 'circles' ? Boolean(c.circle)
      : true;
    const searchableText = `${c.name} ${c.lastMessage} ${c.circle || ''}`.toLowerCase();
    return matchesFilter && searchableText.includes(searchQuery.trim().toLowerCase());
  });
  const unreadNotificationCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      {}
      <aside className={`hidden md:flex flex-col justify-between w-20 lg:w-64 border-r py-5 px-3 transition-colors ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex flex-col gap-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C5CE7] to-[#00C2A8] flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-[#00C2A8] bg-clip-text text-transparent">
                Mingly
              </h1>
              <p className="text-[11px] text-[#9699A6] font-medium leading-none">Connect. Share. Mingle.</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'home', label: 'Home', icon: Compass },
              { id: 'chats', label: 'Chats', icon: MessageSquare, badge: 4 },
              { id: 'stories', label: 'Stories', icon: Camera, badge: stories.length },
              { id: 'circles', label: 'Circles', icon: Users, badge: circles.length },
              { id: 'calls', label: 'Calls', icon: Phone }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  aria-label={item.label}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl font-medium transition-all group ${
                    isActive
                      ? 'bg-[#6C5CE7] text-white shadow-md shadow-indigo-600/30'
                      : theme === 'dark'
                      ? 'text-[#9699A6] hover:bg-[#1F2330] hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                    <span className="hidden lg:inline text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`hidden lg:inline-flex text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#6C5CE7]/15 text-[#6C5CE7]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions: Presence, notifications, theme & profile */}
        <div className="flex flex-col gap-2 pt-4 border-t border-inherit">
          <button
            aria-label="Notifications"
            onClick={() => setIsNotificationsOpen(true)}
            className={`flex items-center justify-between p-3 rounded-xl transition ${
              theme === 'dark' ? 'hover:bg-[#1F2330] text-[#9699A6]' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00C2A8] rounded-full ring-2 ring-[#181B24]" />
                )}
              </div>
              <span className="hidden lg:inline text-sm font-medium">Notifications</span>
            </div>
            {unreadNotificationCount > 0 && (
              <span className="hidden lg:inline text-xs bg-[#00C2A8]/20 text-[#00C2A8] font-bold px-1.5 py-0.5 rounded">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <button
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              theme === 'dark' ? 'hover:bg-[#1F2330] text-[#9699A6]' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            <span className="hidden lg:inline text-sm font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            aria-label="Settings"
            onClick={() => setIsSettingsOpen(true)}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              theme === 'dark' ? 'hover:bg-[#1F2330] text-[#9699A6]' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="hidden lg:inline text-sm font-medium">Settings</span>
          </button>

          {/* User mini profile capsule */}
          <button
            type="button"
            aria-label="Open profile"
            onClick={() => setIsProfileOpen(true)}
            className={`mt-2 p-2 rounded-xl flex items-center gap-3 cursor-pointer transition text-left ${
              theme === 'dark' ? 'hover:bg-[#1F2330]' : 'hover:bg-gray-200'
            }`}
          >
            <div className="relative">
              <img src={currentUser.avatar} alt="Me" className="w-9 h-9 rounded-full object-cover ring-2 ring-[#6C5CE7]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#181B24]" />
            </div>
            <div className="hidden lg:block text-left overflow-hidden">
              <p className="text-xs font-bold truncate leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-[#00C2A8] font-medium truncate">{currentUser.presence}</p>
            </div>
          </button>
        </div>
      </aside>

      {}
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] md:h-screen overflow-hidden">
        {activeTab === 'home' && (
          <HomeView
            theme={theme}
            user={currentUser}
            stories={stories}
            moments={moments}
            circles={circles}
            conversations={conversations}
            onOpenStory={(idx) => setStoryViewer({ isOpen: true, storyIndex: idx })}
            onCreateStory={() => setIsCreateStoryOpen(true)}
            onCreateMoment={() => setIsCreateMomentOpen(true)}
            onSelectChat={selectChat}
            onSelectCircle={openCircleChat}
          />
        )}

        {activeTab === 'chats' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left list of conversations */}
            <div className={`${activeChatId && 'hidden md:flex'} w-full md:w-80 lg:w-96 flex flex-col border-r ${
              theme === 'dark' ? 'bg-[#12151D] border-[#232733]' : 'bg-white border-gray-200'
            }`}>
              <ChatSidebarHeader
                theme={theme}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenSearch={() => setIsSearchOpen(true)}
                onNewChat={() => setIsNewChatOpen(true)}
              />

              {/* Filter Tabs */}
              <div className="flex gap-1 px-3 py-2 border-b border-inherit">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'unread', label: 'Unread' },
                  { id: 'groups', label: 'Groups' },
                  { id: 'circles', label: 'Circles' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setChatFilter(tab.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                      chatFilter === tab.id
                        ? 'bg-[#6C5CE7] text-white shadow-sm'
                        : theme === 'dark'
                        ? 'text-[#9699A6] hover:bg-[#181B24]'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Conversation items list */}
              <div className="flex-1 overflow-y-auto divide-y divide-inherit">
                {filteredConversations.map(chat => {
                  const isSelected = chat.id === activeChatId;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => selectChat(chat.id)}
                      className={`flex items-center gap-3 p-3.5 cursor-pointer transition relative ${
                        isSelected
                          ? theme === 'dark' ? 'bg-[#181B24]' : 'bg-indigo-50/70'
                          : theme === 'dark' ? 'hover:bg-[#181B24]/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-2xl object-cover" />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                          theme === 'dark' ? 'border-[#12151D]' : 'border-white'
                        } ${
                          chat.presence.includes('Available') ? 'bg-emerald-500' :
                          chat.presence.includes('Working') ? 'bg-indigo-500' :
                          chat.presence.includes('Listening') ? 'bg-[#00C2A8]' : 'bg-gray-400'
                        }`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-semibold text-sm truncate flex items-center gap-1.5">
                            {chat.name}
                            {chat.pinned && <Bookmark className="w-3 h-3 text-[#6C5CE7] fill-current" />}
                          </h4>
                          <span className="text-[11px] text-[#9699A6] whitespace-nowrap">{chat.time}</span>
                        </div>
                        <p className="text-xs text-[#9699A6] truncate">{chat.lastMessage}</p>
                        {chat.circle && (
                          <span className="inline-block mt-1 text-[10px] bg-[#6C5CE7]/15 text-[#6C5CE7] font-medium px-2 py-0.2 rounded-full">
                            {chat.circle}
                          </span>
                        )}
                      </div>

                      {chat.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#00C2A8] text-black font-bold text-xs flex items-center justify-center shadow">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Chat Conversation View */}
            <div className={`${!activeChatId && 'hidden md:flex'} flex-1 flex flex-col ${
              theme === 'dark' ? 'bg-[#0F1117]' : 'bg-white'
            }`}>
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className={`h-16 px-4 flex items-center justify-between border-b ${
                    theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveChatId(null)}
                        className="md:hidden p-1.5 rounded-lg hover:bg-white/10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="relative">
                        <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-2xl object-cover" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#181B24]" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm leading-tight">{activeChat.name}</h3>
                          {activeChat.circle && (
                            <span className="hidden sm:inline-block text-[10px] bg-[#6C5CE7]/20 text-[#6C5CE7] font-semibold px-2 py-0.5 rounded-full">
                              {activeChat.circle}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#00C2A8] flex items-center gap-1 font-medium">
                          {activeChat.presence} — <span className="text-[#9699A6]">{activeChat.presenceText}</span>
                        </p>
                      </div>
                    </div>

                    {/* Calling & Menu triggers */}
                    <div className="flex items-center gap-1 text-[#9699A6]">
                      <button
                        onClick={() => startCall('voice')}
                        aria-label="Start voice call"
                        title="Voice Call"
                        className="p-2.5 rounded-xl hover:text-white hover:bg-white/10 transition"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startCall('video')}
                        aria-label="Start video call"
                        title="Video Call"
                        className="p-2.5 rounded-xl hover:text-white hover:bg-white/10 transition"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsMessageSearchOpen(open => !open);
                          setChatMessageQuery('');
                        }}
                        aria-label="Search conversation"
                        title="Search conversation"
                        className="p-2.5 rounded-xl hover:text-white hover:bg-white/10 transition"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsChatDetailsOpen(true)}
                        aria-label="Conversation details"
                        title="Conversation details"
                        className="p-2.5 rounded-xl hover:text-white hover:bg-white/10 transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isMessageSearchOpen && (
                    <div className={`px-4 py-2 border-b flex items-center gap-2 ${
                      theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200'
                    }`}>
                      <Search className="w-4 h-4 text-[#9699A6]" />
                      <input
                        autoFocus
                        value={chatMessageQuery}
                        onChange={event => setChatMessageQuery(event.target.value)}
                        placeholder="Search this conversation"
                        className="flex-1 bg-transparent text-sm outline-none"
                      />
                      <button
                        onClick={() => { setIsMessageSearchOpen(false); setChatMessageQuery(''); }}
                        aria-label="Close message search"
                        className="p-1 rounded hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Messages Scroll Area */}
                  <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${
                    theme === 'dark' ? 'bg-[#0F1117]' : 'bg-gray-50'
                  }`}>
                    {/* Encryption pill indicator */}
                    <div className="flex justify-center my-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                        <Lock className="w-3 h-3" />
                        <span>Local demo data is saved in this browser.</span>
                      </div>
                    </div>

                    {currentChatMessages.filter(msg => {
                      const searchableText = [msg.content, msg.noteTitle, msg.eventTitle, msg.trackTitle]
                        .filter(Boolean).join(' ').toLowerCase();
                      return searchableText.includes(chatMessageQuery.trim().toLowerCase());
                    }).map(msg => (
                      <MessageBubble
                        key={msg.id}
                        msg={msg}
                        theme={theme}
                        showReadReceipts={settings.readReceipts}
                        onReact={(emoji) => handleAddReaction(msg.id, emoji)}
                        onReply={() => setReplyingTo(msg)}
                        onGameMove={(idx) => handleGameMove(msg.id, idx)}
                        onToggleRSVP={(choice) => handleToggleRSVP(msg.id, choice)}
                        onToggleNoteItem={(idx) => handleToggleNoteItem(msg.id, idx)}
                        isPlayingAudio={playingAudioId === msg.id}
                        onToggleAudio={() => setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)}
                        isPlayingMusic={playingMusicId === msg.id}
                        onToggleMusic={() => setPlayingMusicId(playingMusicId === msg.id ? null : msg.id)}
                      />
                    ))}
                    {typingContactName && activeChatId === 'c-alex' && (
                      <p className="text-xs text-[#9699A6] animate-pulse">{typingContactName} is typing...</p>
                    )}
                    {chatMessageQuery && !currentChatMessages.some(msg =>
                      [msg.content, msg.noteTitle, msg.eventTitle, msg.trackTitle]
                        .filter(Boolean).join(' ').toLowerCase().includes(chatMessageQuery.trim().toLowerCase())
                    ) && (
                      <p className="text-center text-sm text-[#9699A6] py-8">No messages match that search.</p>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Reply Preview Bar */}
                  {replyingTo && (
                    <div className={`px-4 py-2 border-t flex items-center justify-between text-xs ${
                      theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-indigo-50 border-indigo-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-8 bg-[#6C5CE7] rounded-full" />
                        <div>
                          <p className="font-semibold text-[#6C5CE7]">Replying to message</p>
                          <p className="text-[#9699A6] truncate max-w-md">{replyingTo.content || 'Attachment'}</p>
                        </div>
                      </div>
                      <button onClick={() => setReplyingTo(null)} className="p-1 hover:bg-white/10 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Attachment Sheet Drawer */}
                  {isAttachmentOpen && (
                    <AttachmentDrawer
                      theme={theme}
                      onSendAttachment={(type, payload) => {
                        handleSendMessage(payload);
                        setIsAttachmentOpen(false);
                      }}
                    />
                  )}

                  {/* Interactive Composer Footer */}
                  <div className={`p-3 border-t relative ${
                    theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200'
                  }`}>
                    {isRecordingAudio ? (
                      <div className="flex items-center justify-between px-3 py-2 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                        <div className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                          <span className="text-sm font-semibold text-rose-400">
                            Recording Audio... 0:{recordTimer < 10 ? '0' : ''}{recordTimer}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsRecordingAudio(false)}
                            className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleFinishVoiceRecord}
                            className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {/* Attachment button */}
                        <button
                          onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
                          className={`p-2.5 rounded-xl transition ${
                            isAttachmentOpen
                              ? 'bg-[#6C5CE7] text-white'
                              : theme === 'dark' ? 'text-[#9699A6] hover:bg-[#1F2330]' : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <Plus className="w-5 h-5" />
                        </button>

                        {/* Emoji trigger */}
                        <button
                          onClick={() => setIsEmojiPickerOpen(open => !open)}
                          title="Insert emoji"
                          className={`p-2.5 rounded-xl transition ${
                            theme === 'dark' ? 'text-[#9699A6] hover:bg-[#1F2330]' : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <Smile className="w-5 h-5" />
                        </button>

                        {/* Text Input */}
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Type a message or share a moment..."
                          className={`flex-1 text-sm px-4 py-2.5 rounded-xl outline-none transition ${
                            theme === 'dark'
                              ? 'bg-[#0F1117] text-white placeholder-gray-500 focus:ring-2 focus:ring-[#6C5CE7]'
                              : 'bg-gray-100 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#6C5CE7]'
                          }`}
                        />

                        {/* Send or Voice Record trigger */}
                        {inputText.trim() ? (
                          <button
                            onClick={() => handleSendMessage()}
                            className="p-2.5 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white rounded-xl shadow-md transition-transform active:scale-95"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsRecordingAudio(true)}
                            className="p-2.5 bg-[#00C2A8] hover:bg-[#00ab94] text-black rounded-xl shadow-md transition-transform active:scale-95"
                            title="Hold or click to record voice note"
                          >
                            <Mic className="w-4 h-4" />
                          </button>
                        )}
                          {isEmojiPickerOpen && (
                            <div className={`absolute bottom-16 left-12 z-40 grid grid-cols-8 gap-1 p-2 rounded-xl border shadow-xl ${
                              theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200'
                            }`}>
                              {['😀', '😂', '🥹', '😍', '😎', '🤔', '🙌', '👏', '❤️', '💜', '🔥', '✨', '🎉', '👍', '☕', '🚀'].map(emoji => (
                                <button
                                  key={emoji}
                                  onClick={() => {
                                    setInputText(text => `${text}${emoji}`);
                                    setIsEmojiPickerOpen(false);
                                  }}
                                  aria-label={`Insert ${emoji}`}
                                  className="w-8 h-8 rounded-lg hover:bg-white/10 text-lg"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-[#6C5CE7] mb-4">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold">Select a conversation</h3>
                  <p className="text-sm text-[#9699A6] max-w-sm mt-1">
                    Connect with your friends, check your Circles, or start a collaborative note.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <StoriesGalleryView
            stories={stories}
            onOpenStory={(idx) => setStoryViewer({ isOpen: true, storyIndex: idx })}
            onCreateStory={() => setIsCreateStoryOpen(true)}
          />
        )}

        {activeTab === 'circles' && (
          <CirclesMainView
            theme={theme}
            circles={circles}
            onCreateCircle={() => setIsCreateCircleOpen(true)}
            onOpenCircleChat={openCircleChat}
            onInviteCircle={setCircleToInvite}
          />
        )}

        {activeTab === 'calls' && (
          <CallsHistoryView
            theme={theme}
            callHistory={callHistory}
            onStartCall={(type) => startCall(type)}
          />
        )}
      </main>

      {}
      <nav className={`md:hidden flex items-center justify-around h-16 border-t px-2 fixed bottom-0 left-0 right-0 z-30 ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200'
      }`}>
        {[
          { id: 'home', label: 'Home', icon: Compass },
          { id: 'chats', label: 'Chats', icon: MessageSquare, badge: 4 },
          { id: 'stories', label: 'Stories', icon: Camera },
          { id: 'circles', label: 'Circles', icon: Users },
          { id: 'profile', label: 'You', icon: Sparkles }
        ].map(item => {
          const Icon = item.icon;
          const isActive = item.id === 'profile' ? isProfileOpen : activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'profile') {
                  setIsProfileOpen(true);
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition relative ${
                isActive ? 'text-[#6C5CE7]' : theme === 'dark' ? 'text-[#9699A6]' : 'text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-[#00C2A8]" />
              )}
            </button>
          );
        })}
      </nav>

      {}
      {activeCall && (
        <CallModal
          call={activeCall}
          onToggleMute={() => setActiveCall(p => ({ ...p, isMuted: !p.isMuted }))}
          onToggleVideo={() => setActiveCall(p => ({ ...p, isVideoOff: !p.isVideoOff }))}
          onEndCall={() => {
            setCallHistory(prev => [{
              id: `call-${Date.now()}`,
              name: activeCall.partnerName,
              type: activeCall.type,
              duration: formatDuration(activeCall.duration),
              time: new Date().toLocaleString(),
              status: 'outgoing'
            }, ...prev]);
            addToast(`Call ended (${formatDuration(activeCall.duration)})`);
            setActiveCall(null);
          }}
        />
      )}

      {}
      {storyViewer.isOpen && (
        <StoryViewerModal
          stories={stories}
          initialIndex={storyViewer.storyIndex}
          onClose={() => setStoryViewer({ isOpen: false, storyIndex: 0 })}
          onReply={(text) => addToast(`Story reply sent: "${text}"`, 'success')}
          onReact={(emoji) => addToast(`Reacted ${emoji} to story!`)}
        />
      )}

      {}
      {isCreateStoryOpen && (
        <CreateStoryModal
          theme={theme}
          circles={circles}
          onClose={() => setIsCreateStoryOpen(false)}
          onPublish={(newStory) => {
            setStories([newStory, ...stories]);
            setIsCreateStoryOpen(false);
            addToast('Story published to Mingly!', 'success');
          }}
        />
      )}

      {}
      {isCreateMomentOpen && (
        <CreateMomentModal
          theme={theme}
          onClose={() => setIsCreateMomentOpen(false)}
          onPublish={(newMoment) => {
            setMoments([newMoment, ...moments]);
            setIsCreateMomentOpen(false);
            addToast('Quick Moment shared!', 'success');
          }}
        />
      )}

      {}
      {isCreateCircleOpen && (
        <CreateCircleModal
          theme={theme}
          onClose={() => setIsCreateCircleOpen(false)}
          onCreate={(newCircle) => {
            setCircles([...circles, newCircle]);
            setIsCreateCircleOpen(false);
            addToast(`Circle "${newCircle.name}" created!`, 'success');
          }}
        />
      )}

      {isNewChatOpen && (
        <NewConversationModal
          theme={theme}
          onClose={() => setIsNewChatOpen(false)}
          onCreate={createConversation}
        />
      )}

      {circleToInvite && (
        <InviteMemberModal
          theme={theme}
          circle={circleToInvite}
          onClose={() => setCircleToInvite(null)}
          onInvite={name => {
            setCircles(prev => prev.map(circle => circle.id === circleToInvite.id
              ? { ...circle, invitees: [...(circle.invitees || []), name] }
              : circle
            ));
            addToast(`Invitation for ${name} saved locally.`, 'success');
            setCircleToInvite(null);
          }}
        />
      )}

      {isChatDetailsOpen && activeChat && (
        <ChatDetailsModal
          theme={theme}
          chat={activeChat}
          onClose={() => setIsChatDetailsOpen(false)}
          onTogglePin={() => setConversations(prev => prev.map(chat =>
            chat.id === activeChat.id ? { ...chat, pinned: !chat.pinned } : chat
          ))}
          onMarkUnread={() => {
            setConversations(prev => prev.map(chat => chat.id === activeChat.id ? { ...chat, unreadCount: 1 } : chat));
            setIsChatDetailsOpen(false);
          }}
        />
      )}

      {}
      {isProfileOpen && (
        <ProfileModal
          theme={theme}
          user={currentUser}
          onClose={() => setIsProfileOpen(false)}
          onUpdatePresence={(presence, customPresence) => {
            setCurrentUser(p => ({ ...p, presence, customPresence }));
            addToast(`Presence updated to ${presence}`);
          }}
        />
      )}

      {}
      {isNotificationsOpen && (
        <NotificationsModal
          theme={theme}
          notifications={notifications}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAllRead={() => setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })))}
        />
      )}

      {}
      {isSearchOpen && (
        <GlobalSearchModal
          theme={theme}
          conversations={conversations}
          circles={circles}
          messages={messages}
          onClose={() => setIsSearchOpen(false)}
          onSelectChat={(id) => { selectChat(id); setIsSearchOpen(false); }}
          onSelectCircle={(circle) => { openCircleChat(circle); setIsSearchOpen(false); }}
        />
      )}

      {}
      {isSettingsOpen && (
        <SettingsModal
          theme={theme}
          setTheme={setTheme}
          settings={settings}
          setSettings={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#181B24] text-white border border-[#232733] shadow-xl rounded-xl px-4 py-3 flex items-center gap-3 animate-bounce-short text-sm"
          >
            <Sparkles className="w-4 h-4 text-[#00C2A8]" />
            <span>{toast.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeView({
  theme,
  user,
  stories,
  moments,
  circles,
  conversations,
  onOpenStory,
  onCreateStory,
  onCreateMoment,
  onSelectChat,
  onSelectCircle
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-6xl mx-auto w-full space-y-8">
      {/* Welcome Banner */}
      <div className={`p-6 rounded-3xl relative overflow-hidden border ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#6C5CE7]/20 text-[#6C5CE7]">
                Mingly Social Hub
              </span>
              <span className="text-xs text-[#00C2A8] font-medium flex items-center gap-1">
                {user.presence}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Good Evening, {user.name.split(' ')[0]} 👋
            </h2>
            <p className="text-sm text-[#9699A6] mt-1">
              See what’s happening with your people, private circles, and shared moments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCreateMoment}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#00C2A8] text-black hover:bg-[#00ab94] transition shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Share Moment</span>
            </button>
            <button
              onClick={onCreateStory}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#6C5CE7] text-white hover:bg-[#5b4cd1] transition shadow-md"
            >
              <Camera className="w-4 h-4" />
              <span>Add Story</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stories Horizontal Tray */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold tracking-wider uppercase text-[#9699A6]">Stories</h3>
          <button onClick={onCreateStory} className="text-xs text-[#6C5CE7] hover:underline font-semibold">
            + New Story
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {/* Add story card */}
          <div
            onClick={onCreateStory}
            className={`w-28 h-44 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed transition group ${
              theme === 'dark'
                ? 'border-[#232733] bg-[#181B24]/50 hover:border-[#6C5CE7]'
                : 'border-gray-300 bg-white hover:border-[#6C5CE7]'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#6C5CE7]/20 text-[#6C5CE7] flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Your Story</span>
            <span className="text-[10px] text-[#9699A6]">Disappears in 24h</span>
          </div>

          {/* Friends Stories */}
          {stories.map((st, idx) => (
            <div
              key={st.id}
              onClick={() => onOpenStory(idx)}
              className="w-28 h-44 rounded-2xl flex-shrink-0 relative overflow-hidden cursor-pointer group shadow-md"
            >
              <img
                src={st.mediaUrl}
                alt={st.userName}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              <div className="absolute top-2 left-2 p-0.5 rounded-full bg-gradient-to-tr from-[#6C5CE7] to-[#00C2A8]">
                <img src={st.userAvatar} alt={st.userName} className="w-7 h-7 rounded-full object-cover border border-black" />
              </div>

              {st.circle && (
                <span className="absolute top-2 right-2 text-[9px] bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[#00C2A8] font-bold">
                  {st.circle.split(' ')[0]}
                </span>
              )}

              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-bold text-white truncate">{st.userName}</p>
                <p className="text-[10px] text-gray-300 truncate">{st.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Moments Feed */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold tracking-wider uppercase text-[#9699A6]">Active Moments</h3>
          <span className="text-xs text-[#00C2A8] font-medium">Auto-disappearing updates</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moments.map(m => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition ${
                theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img src={m.avatar} alt={m.user} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs font-bold truncate">{m.user}</span>
                </div>
                <span className="text-[10px] text-[#9699A6] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {m.expiresIn}
                </span>
              </div>
              <div className="inline-block px-2 py-0.5 rounded-md text-xs font-semibold bg-[#6C5CE7]/15 text-[#6C5CE7] mb-1.5">
                {m.mood}
              </div>
              <p className="text-xs text-[#9699A6] line-clamp-2 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Your Circles Grid */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold tracking-wider uppercase text-[#9699A6]">Your Private Circles</h3>
          <span className="text-xs text-[#9699A6]">Scoped privacy & feeds</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {circles.map(c => (
            <div
              key={c.id}
              onClick={() => onSelectCircle(c)}
              className={`p-5 rounded-2xl border cursor-pointer group transition hover:-translate-y-1 ${
                theme === 'dark' ? 'bg-[#181B24] border-[#232733] hover:border-[#6C5CE7]' : 'bg-white border-gray-200 hover:border-[#6C5CE7] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${c.color} flex items-center justify-center text-2xl shadow-md`}>
                  {c.emoji}
                </div>
                <span className="text-xs text-[#00C2A8] font-bold bg-[#00C2A8]/10 px-2 py-0.5 rounded-full">
                  {c.memberCount} members
                </span>
              </div>
              <h4 className="font-bold text-sm mb-1 group-hover:text-[#6C5CE7] transition">{c.name}</h4>
              <p className="text-xs text-[#9699A6] line-clamp-2 mb-3 leading-relaxed">{c.description}</p>
              <div className="text-[11px] text-gray-400 bg-black/20 p-2 rounded-xl truncate">
                📢 {c.recentUpdate}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Mingles list */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold tracking-wider uppercase text-[#9699A6]">Recent Conversations</h3>
        </div>

        <div className={`rounded-2xl divide-y border overflow-hidden ${
          theme === 'dark' ? 'bg-[#181B24] border-[#232733] divide-[#232733]' : 'bg-white border-gray-200 divide-gray-100 shadow-sm'
        }`}>
          {conversations.slice(0, 3).map(chat => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-indigo-500/5 transition"
            >
              <div className="flex items-center gap-3">
                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h5 className="font-bold text-sm">{chat.name}</h5>
                  <p className="text-xs text-[#9699A6] truncate">{chat.lastMessage}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#9699A6]">{chat.time}</span>
                <span className="block text-[11px] text-[#00C2A8] font-medium">{chat.presence}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ChatSidebarHeader({ theme, searchQuery, setSearchQuery, onOpenSearch, onNewChat }) {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Messages</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            aria-label="Search conversations"
            title="Search conversations"
            className={`p-2 rounded-xl transition ${
              theme === 'dark' ? 'hover:bg-[#181B24] text-[#9699A6]' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={onNewChat}
            aria-label="Start a new chat"
            title="Start a new chat"
            className="p-2 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white rounded-xl shadow transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${
        theme === 'dark' ? 'bg-[#181B24] text-gray-300' : 'bg-gray-100 text-gray-700'
      }`}>
        <Search className="w-3.5 h-3.5 text-[#9699A6]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search chats, people, circles..."
          className="bg-transparent outline-none flex-1 placeholder-gray-500"
        />
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  theme,
  showReadReceipts,
  onReact,
  onReply,
  onGameMove,
  onToggleRSVP,
  onToggleNoteItem,
  isPlayingAudio,
  onToggleAudio,
  isPlayingMusic,
  onToggleMusic
}) {
  const isMe = msg.sender === 'me';
  const [showReactBar, setShowReactBar] = useState(false);

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group relative`}>
      {/* Sender name for group chats */}
      {msg.senderName && !isMe && (
        <span className="text-[11px] font-bold text-[#6C5CE7] ml-2 mb-1">
          {msg.senderName}
        </span>
      )}

      {/* Bubble Container */}
      <div
        onMouseEnter={() => setShowReactBar(true)}
        onMouseLeave={() => setShowReactBar(false)}
        className="relative max-w-sm sm:max-w-md"
      >
        {/* Quick Reaction Bar on Hover */}
        {showReactBar && (
          <div className={`absolute -top-9 ${isMe ? 'right-0' : 'left-0'} flex items-center gap-1 bg-[#181B24] border border-[#232733] px-2 py-1 rounded-full shadow-lg z-20 animate-fade-in`}>
            {['❤️', '👍', '🔥', '😂', '😮'].map(em => (
              <button
                key={em}
                onClick={() => onReact(em)}
                className="hover:scale-125 transition text-xs p-1"
              >
                {em}
              </button>
            ))}
            <button onClick={onReply} className="text-[10px] text-[#9699A6] hover:text-white px-1">
              Reply
            </button>
          </div>
        )}

        <div className={`rounded-2xl p-3.5 shadow-sm text-sm ${
          isMe
            ? 'bg-[#6C5CE7] text-white rounded-br-none'
            : theme === 'dark'
            ? 'bg-[#181B24] text-white border border-[#232733] rounded-bl-none'
            : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none shadow-sm'
        }`}>
          {/* Reply Context Header if present */}
          {msg.replyTo && (
            <div className={`mb-2 pl-2 border-l-2 text-xs py-0.5 rounded ${
              isMe ? 'border-white/60 bg-white/10 text-white/90' : 'border-[#6C5CE7] bg-[#6C5CE7]/10 text-indigo-300'
            }`}>
              <p className="font-semibold text-[10px]">Replying to</p>
              <p className="truncate">{msg.replyTo}</p>
            </div>
          )}

          {/* Type: Text */}
          {msg.type === 'text' && (
            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          )}

          {/* Type: Voice Note Audio Player */}
          {msg.type === 'audio' && (
            <div className="flex items-center gap-3 w-56 sm:w-64 py-1">
              <button
                onClick={onToggleAudio}
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isMe ? 'bg-white text-[#6C5CE7]' : 'bg-[#6C5CE7] text-white'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex-1 flex flex-col gap-1">
                {/* Simulated Waveform scrub bars */}
                <div className="flex items-center gap-0.5 h-5">
                  {[40, 70, 30, 90, 50, 80, 20, 100, 60, 45, 85, 30, 65, 95, 40].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`w-1 rounded-full transition-all ${
                        isPlayingAudio
                          ? isMe ? 'bg-white animate-pulse' : 'bg-[#00C2A8] animate-pulse'
                          : isMe ? 'bg-white/50' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] opacity-80 font-mono">
                  <span>{isPlayingAudio ? 'Playing' : 'Voice note'}</span>
                  <span>{msg.audioDuration}</span>
                </div>
              </div>
            </div>
          )}

          {/* Type: Tic-Tac-Toe Interactive Mini Game */}
          {msg.type === 'game' && (
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center justify-between pb-1 border-b border-white/20">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Gamepad2 className="w-4 h-4 text-[#00C2A8]" />
                  <span>{msg.gameTitle}</span>
                </div>
                <span className="text-[10px] font-semibold bg-white/20 px-1.5 py-0.5 rounded">
                  {msg.winner
                    ? msg.winner === 'Draw'
                      ? '🤝 Draw!'
                      : `🎉 ${msg.winner} Won!`
                    : `Turn: ${msg.turn}`}
                </span>
              </div>

              {/* 3x3 Grid */}
              <div className="grid grid-cols-3 gap-1 bg-black/20 p-1.5 rounded-xl">
                {msg.board.map((cell, idx) => (
                  <button
                    key={idx}
                    onClick={() => onGameMove(idx)}
                    disabled={Boolean(cell || msg.winner)}
                    className="h-12 rounded-lg bg-black/40 hover:bg-black/60 flex items-center justify-center font-bold text-lg transition disabled:opacity-80"
                  >
                    {cell === 'X' && <span className="text-[#00C2A8]">X</span>}
                    {cell === 'O' && <span className="text-amber-400">O</span>}
                  </button>
                ))}
              </div>
              <p className="text-[10px] opacity-75 text-center">Tap any cell to make your turn!</p>
            </div>
          )}

          {/* Type: Interactive Shared Note */}
          {msg.type === 'note' && (
            <div className="flex flex-col gap-2 min-w-[220px]">
              <div className="flex items-center gap-2 pb-1 border-b border-inherit">
                <FileText className="w-4 h-4 text-[#00C2A8]" />
                <h4 className="font-bold text-xs">{msg.noteTitle}</h4>
              </div>
              <div className="space-y-1.5 mt-1">
                {msg.items.map((item, idx) => (
                  <label
                    key={idx}
                    onClick={() => onToggleNoteItem(idx)}
                    className="flex items-center gap-2 text-xs cursor-pointer select-none hover:opacity-90"
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      readOnly
                      className="rounded accent-[#6C5CE7] cursor-pointer"
                    />
                    <span className={item.done ? 'line-through opacity-60' : ''}>{item.text}</span>
                  </label>
                ))}
              </div>
              <div className="text-[10px] text-[#00C2A8] font-semibold text-right">
                Collaborative Mingly Note
              </div>
            </div>
          )}

          {/* Type: Event Invitation RSVP */}
          {msg.type === 'event' && (
            <div className="flex flex-col gap-2 min-w-[240px]">
              <div className="flex items-center justify-between pb-1 border-b border-inherit">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-xs">{msg.eventTitle}</span>
                </div>
              </div>
              <div className="text-xs space-y-1 text-gray-200">
                <p>📅 {msg.date} at {msg.timeDetail}</p>
                <p>📍 {msg.location}</p>
                <p className="text-[11px] text-[#00C2A8] font-medium">
                  {msg.attendees.length} people going ({msg.attendees.slice(0, 2).join(', ')}...)
                </p>
              </div>

              {/* RSVP Action Buttons */}
              <div className="flex gap-1.5 pt-1">
                {['going', 'maybe', 'cant'].map(status => (
                  <button
                    key={status}
                    onClick={() => onToggleRSVP(status)}
                    className={`flex-1 py-1 text-[11px] rounded-lg font-bold capitalize transition ${
                      msg.userStatus === status
                        ? 'bg-emerald-500 text-white shadow'
                        : 'bg-black/30 hover:bg-black/50 text-gray-300'
                    }`}
                  >
                    {status === 'going' ? '✓ Going' : status === 'maybe' ? 'Maybe' : 'Can’t'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Type: Shared Music Track */}
          {msg.type === 'music' && (
            <div className="flex items-center gap-3 min-w-[220px]">
              <img src={msg.albumArt} alt={msg.trackTitle} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-xs truncate">{msg.trackTitle}</h5>
                <p className="text-[11px] text-[#9699A6] truncate">{msg.artist}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-[#00C2A8] font-bold">
                  <Music className="w-3 h-3" />
                  <span>Currently listening</span>
                </div>
              </div>
              <button
                onClick={onToggleMusic}
                className="w-8 h-8 rounded-full bg-[#00C2A8] text-black flex items-center justify-center flex-shrink-0 hover:scale-105 transition"
              >
                {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            </div>
          )}

          {/* Timestamp and Delivery checkmarks */}
          <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
            isMe ? 'text-white/80' : 'text-[#9699A6]'
          }`}>
            <span>{msg.time}</span>
            {isMe && showReadReceipts && (
              <span>
                {msg.status === 'read' ? (
                  <CheckCheck className="w-3.5 h-3.5 text-[#00C2A8]" />
                ) : msg.status === 'delivered' ? (
                  <CheckCheck className="w-3.5 h-3.5 text-white/70" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-white/50" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Reaction Pill badges */}
        {msg.reactions && Object.keys(msg.reactions).length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {Object.entries(msg.reactions).map(([emoji, count]) => (
              <span
                key={emoji}
                onClick={() => onReact(emoji)}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#181B24] border border-[#232733] cursor-pointer hover:scale-105 transition"
              >
                <span>{emoji}</span>
                <span className="font-bold text-[10px] text-gray-300">{count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AttachmentDrawer({ theme, onSendAttachment }) {
  const options = [
    {
      id: 'photo',
      label: 'Photo & Video',
      icon: ImageIcon,
      color: 'bg-emerald-500',
      action: () => {
        onSendAttachment('photo', {
          id: `media-${Date.now()}`,
          sender: 'me',
          type: 'text',
          content: '📸 Shared a media moment from gallery',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          reactions: {}
        });
      }
    },
    {
      id: 'note',
      label: 'Shared Note',
      icon: FileText,
      color: 'bg-indigo-600',
      action: () => {
        onSendAttachment('note', {
          id: `note-${Date.now()}`,
          sender: 'me',
          type: 'note',
          noteTitle: 'Trip to Manali Budget 🏔️',
          items: [
            { text: 'Hotel Solang: ₹4,500', done: true },
            { text: 'Transport & SUV: ₹2,800', done: false },
            { text: 'Paragliding & Passes: ₹1,500', done: false }
          ],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          reactions: {}
        });
      }
    },
    {
      id: 'event',
      label: 'Create Event',
      icon: Calendar,
      color: 'bg-amber-500',
      action: () => {
        onSendAttachment('event', {
          id: `evt-${Date.now()}`,
          sender: 'me',
          type: 'event',
          eventTitle: 'Coffee & Code Meetup ☕',
          date: 'Sunday, 5:00 PM',
          timeDetail: '2 hours',
          location: 'Blue Tokai Cafe',
          attendees: ['Taranjeet Singh'],
          userStatus: 'going',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          reactions: {}
        });
      }
    },
    {
      id: 'game',
      label: 'Tic-Tac-Toe Game',
      icon: Gamepad2,
      color: 'bg-pink-500',
      action: () => {
        onSendAttachment('game', {
          id: `game-${Date.now()}`,
          sender: 'me',
          type: 'game',
          gameTitle: 'Tic-Tac-Toe Challenge',
          board: [null, null, null, null, null, null, null, null, null],
          turn: 'X',
          winner: null,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          reactions: {}
        });
      }
    },
    {
      id: 'music',
      label: 'Share Music',
      icon: Music,
      color: 'bg-teal-500',
      action: () => {
        onSendAttachment('music', {
          id: `mus-${Date.now()}`,
          sender: 'me',
          type: 'music',
          trackTitle: 'Starboy',
          artist: 'The Weeknd ft. Daft Punk',
          albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          reactions: {}
        });
      }
    },
    {
      id: 'location',
      label: 'Live Location',
      icon: MapPin,
      color: 'bg-sky-500',
      action: () => {
        onSendAttachment('text', {
          id: `loc-${Date.now()}`,
          sender: 'me',
          type: 'text',
          content: '📍 Live Location shared: Sector 17 Plaza, Chandigarh (Active for 60 mins)',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          reactions: {}
        });
      }
    }
  ];

  return (
    <div className={`p-4 border-t grid grid-cols-3 sm:grid-cols-6 gap-3 animate-fade-in ${
      theme === 'dark' ? 'bg-[#12151D] border-[#232733]' : 'bg-gray-50 border-gray-200'
    }`}>
      {options.map(opt => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            onClick={opt.action}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/5 transition group"
          >
            <div className={`w-11 h-11 rounded-2xl ${opt.color} text-white flex items-center justify-center shadow group-hover:scale-110 transition`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-center leading-tight">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function StoryViewerModal({ stories, initialIndex, onClose, onReply, onReact }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');

  const currentStory = stories[currentIndex] || stories[0];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(i => i + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return old + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, stories.length, onClose]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(i => i + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center select-none">
      <div className="relative w-full max-w-md h-[90vh] bg-black rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10">
        {/* Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex gap-1">
          {stories.map((st, i) => (
            <div key={st.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Top Header info */}
        <div className="relative z-30 pt-6 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={currentStory.userAvatar} alt={currentStory.userName} className="w-8 h-8 rounded-full border border-white" />
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                {currentStory.userName}
                {currentStory.circle && (
                  <span className="text-[10px] bg-[#6C5CE7]/60 text-white font-medium px-2 py-0.2 rounded-full">
                    {currentStory.circle}
                  </span>
                )}
              </p>
              <p className="text-[10px] text-gray-300">{currentStory.timeAgo}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Media and Tap Areas */}
        <div
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="absolute inset-0 z-10 flex"
        >
          <img src={currentStory.mediaUrl} alt="Story content" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Prev/Next tap targets */}
          <div onClick={handlePrev} className="w-1/3 h-full cursor-pointer" />
          <div onClick={handleNext} className="w-2/3 h-full cursor-pointer" />
        </div>

        {/* Caption & Music Bar */}
        <div className="relative z-30 px-4 pb-2">
          {currentStory.music && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs mb-2 border border-white/10">
              <Music className="w-3.5 h-3.5 text-[#00C2A8] animate-spin" />
              <span>{currentStory.music}</span>
            </div>
          )}
          <p className="text-white text-sm font-medium leading-relaxed drop-shadow-md">
            {currentStory.caption}
          </p>
        </div>

        {/* Story Reply Composer & Reactions */}
        <div className="relative z-30 p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            {['❤️', '🔥', '👏', '😍', '😂'].map(em => (
              <button
                key={em}
                onClick={() => onReact(em)}
                className="hover:scale-125 transition text-lg flex-1 text-center py-1"
              >
                {em}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && replyText.trim()) {
                  onReply(replyText);
                  setReplyText('');
                }
              }}
              placeholder={`Reply to ${currentStory.userName}...`}
              className="flex-1 bg-white/20 text-white placeholder-gray-300 text-xs px-3.5 py-2.5 rounded-full outline-none"
            />
            <button
              onClick={() => {
                if (replyText.trim()) {
                  onReply(replyText);
                  setReplyText('');
                }
              }}
              className="p-2.5 bg-[#6C5CE7] rounded-full text-white hover:scale-105 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateStoryModal({ theme, circles, onClose, onPublish }) {
  const [caption, setCaption] = useState('');
  const [selectedCircle, setSelectedCircle] = useState('Everyone');
  const [musicTrack, setMusicTrack] = useState('Midnight City - M83');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
  );

  const sampleImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#6C5CE7]" />
            <h3 className="font-bold text-lg">Add Mingly Story</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview */}
        <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-inherit">
          <img src={imageUrl} alt="Story preview" className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-2 flex gap-1">
            {sampleImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setImageUrl(img)}
                className={`w-6 h-6 rounded-md overflow-hidden border-2 ${
                  imageUrl === img ? 'border-[#00C2A8]' : 'border-white/50'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add an aesthetic caption or mood..."
            className={`w-full text-xs p-3 rounded-xl outline-none ${
              theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
            }`}
          />
        </div>

        {/* Circle Visibility Selector */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">Share with Circle</label>
          <select
            value={selectedCircle}
            onChange={(e) => setSelectedCircle(e.target.value)}
            className={`w-full text-xs p-2.5 rounded-xl outline-none font-medium ${
              theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <option value="Everyone">🌐 Everyone (Public)</option>
            {circles.map(c => (
              <option key={c.id} value={c.name}>{c.emoji} {c.name} Circle</option>
            ))}
          </select>
        </div>

        {/* Music selector */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">Add Music Track</label>
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-[#00C2A8]" />
            <input
              type="text"
              value={musicTrack}
              onChange={(e) => setMusicTrack(e.target.value)}
              className={`flex-1 text-xs p-2 rounded-xl outline-none ${
                theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
              }`}
            />
          </div>
        </div>

        <button
          onClick={() => {
            onPublish({
              id: `story-${Date.now()}`,
              userId: 'me',
              userName: 'Taranjeet Singh',
              userAvatar: INITIAL_USER.avatar,
              mediaUrl: imageUrl,
              caption: caption || 'Living in the moment ✨',
              music: musicTrack,
              circle: selectedCircle === 'Everyone' ? null : selectedCircle,
              timeAgo: 'Just now',
              viewed: false
            });
          }}
          className="w-full py-3 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          Publish 24h Story
        </button>
      </div>
    </div>
  );
}

function CreateMomentModal({ theme, onClose, onPublish }) {
  const [selectedMood, setSelectedMood] = useState('☕ Having coffee');
  const [momentText, setMomentText] = useState('');
  const [expiry, setExpiry] = useState('4h left');

  const moods = [
    '☕ Having coffee',
    '💻 Working',
    '🎧 Listening to music',
    '✈️ Travelling',
    '🎮 Gaming',
    '📚 Studying',
    '🏃 Away'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00C2A8]" />
            <h3 className="font-bold text-lg">Share Quick Moment</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mood chips */}
        <label className="text-xs font-semibold text-[#9699A6] block mb-2">Select Mood</label>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {moods.map(m => (
            <button
              key={m}
              onClick={() => setSelectedMood(m)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                selectedMood === m
                  ? 'bg-[#6C5CE7] text-white'
                  : theme === 'dark' ? 'bg-[#0F1117] text-gray-400' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Text */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">What's happening?</label>
          <textarea
            rows={3}
            value={momentText}
            onChange={(e) => setMomentText(e.target.value)}
            placeholder="E.g., Finishing up the design sprint with iced matcha..."
            className={`w-full text-xs p-3 rounded-xl outline-none ${
              theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
            }`}
          />
        </div>

        {/* Expiration Duration */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">Expires after</label>
          <div className="flex gap-2">
            {['1h left', '4h left', '12h left', '24h left'].map(exp => (
              <button
                key={exp}
                onClick={() => setExpiry(exp)}
                className={`flex-1 py-1.5 text-xs rounded-lg font-semibold ${
                  expiry === exp ? 'bg-[#00C2A8] text-black' : 'bg-black/20 text-gray-400'
                }`}
              >
                {exp.replace(' left', '')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            onPublish({
              id: `moment-${Date.now()}`,
              user: INITIAL_USER.name,
              avatar: INITIAL_USER.avatar,
              mood: selectedMood,
              text: momentText || 'Enjoying the day vibes ✌️',
              expiresIn: expiry
            });
          }}
          className="w-full py-3 bg-[#00C2A8] hover:bg-[#00ab94] text-black font-bold text-xs rounded-xl shadow-md transition"
        >
          Post Moment
        </button>
      </div>
    </div>
  );
}

function CreateCircleModal({ theme, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('⚡');
  const [description, setDescription] = useState('');

  const emojis = ['⚡', '🎨', '🏖️', '🚀', '☕', '🏕️', '🍕', '🎮'];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#6C5CE7]" />
            <h3 className="font-bold text-lg">Create New Circle</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">Circle Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Designers Hub, Family..."
            className={`w-full text-xs p-3 rounded-xl outline-none ${
              theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">Choose Icon</label>
          <div className="flex gap-2">
            {emojis.map(em => (
              <button
                key={em}
                onClick={() => setEmoji(em)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border ${
                  emoji === em ? 'border-[#6C5CE7] bg-[#6C5CE7]/20' : 'border-transparent bg-black/20'
                }`}
              >
                {em}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold text-[#9699A6] block mb-1">Circle Purpose</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this space for?"
            className={`w-full text-xs p-3 rounded-xl outline-none ${
              theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
            }`}
          />
        </div>

        <button
          onClick={() => {
            if (!name.trim()) return;
            onCreate({
              id: `circle-${Date.now()}`,
              name,
              emoji,
              color: 'from-purple-600 to-indigo-600',
              description: description || 'Private circle space on Mingly',
              memberCount: 1,
              activeStories: 0,
              recentUpdate: 'Circle created just now'
            });
          }}
          className="w-full py-3 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          Launch Circle
        </button>
      </div>
    </div>
  );
}

function CirclesMainView({ theme, circles, onCreateCircle, onOpenCircleChat, onInviteCircle }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Circles</h2>
          <p className="text-sm text-[#9699A6]">Private micro-networks for your friends, college, and teams.</p>
        </div>
        <button
          onClick={onCreateCircle}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#6C5CE7] text-white hover:bg-[#5b4cd1] transition shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Circle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {circles.map(c => (
          <div
            key={c.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition ${
              theme === 'dark' ? 'bg-[#181B24] border-[#232733]' : 'bg-white border-gray-200 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${c.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {c.emoji}
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#00C2A8] bg-[#00C2A8]/10 px-2.5 py-1 rounded-full">
                    {c.memberCount} Members
                  </span>
                  <p className="text-[10px] text-[#9699A6] mt-1">{c.activeStories} active stories</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-1">{c.name}</h3>
              <p className="text-xs text-[#9699A6] leading-relaxed mb-4">{c.description}</p>

              <div className="p-3 rounded-2xl bg-black/20 text-xs text-gray-300 flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#6C5CE7] flex-shrink-0" />
                <span className="truncate">Latest: {c.recentUpdate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-inherit">
              <button
                onClick={() => onOpenCircleChat(c)}
                className="flex-1 py-2.5 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white text-xs font-bold rounded-xl transition"
              >
                Open Circle Chat
              </button>
              <button
                onClick={() => onInviteCircle(c)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition ${
                  theme === 'dark' ? 'border-[#232733] hover:bg-white/5' : 'border-gray-200 hover:bg-gray-100'
                }`}
              >
                + Member
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoriesGalleryView({ stories, onOpenStory, onCreateStory }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mingly Stories</h2>
          <p className="text-sm text-[#9699A6]">Visual moments disappearing every 24 hours.</p>
        </div>
        <button
          onClick={onCreateStory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#6C5CE7] text-white hover:bg-[#5b4cd1] transition shadow"
        >
          <Camera className="w-4 h-4" />
          <span>Upload Story</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {stories.map((st, idx) => (
          <div
            key={st.id}
            onClick={() => onOpenStory(idx)}
            className="aspect-[9/16] rounded-3xl relative overflow-hidden cursor-pointer group shadow-xl"
          >
            <img src={st.mediaUrl} alt={st.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            <div className="absolute top-3 left-3 flex items-center gap-2">
              <img src={st.userAvatar} alt={st.userName} className="w-8 h-8 rounded-full border border-white" />
              <div className="text-white">
                <p className="text-xs font-bold leading-tight">{st.userName}</p>
                <p className="text-[10px] text-gray-300">{st.timeAgo}</p>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-xs font-semibold line-clamp-2">{st.caption}</p>
              {st.circle && (
                <span className="inline-block mt-1 text-[9px] bg-[#6C5CE7] px-2 py-0.5 rounded-full font-bold">
                  {st.circle}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CallsHistoryView({ theme, callHistory, onStartCall }) {
  const demoCallLogs = [
    { id: 1, name: 'Alex Chen', time: 'Today, 8:20 PM', type: 'video', status: 'incoming', duration: '14 min' },
    { id: 2, name: 'Maya Patel', time: 'Yesterday, 6:45 PM', type: 'voice', status: 'missed', duration: '0 min' },
    { id: 3, name: 'Liam Vance', time: 'Sep 28, 11:15 AM', type: 'video', status: 'outgoing', duration: '28 min' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Call History</h2>
          <p className="text-sm text-[#9699A6]">Local call simulator. Calls are not placed over a network.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onStartCall('voice')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#6C5CE7] text-white hover:bg-[#5b4cd1]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Voice Call</span>
          </button>
          <button
            onClick={() => onStartCall('video')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#00C2A8] text-black hover:bg-[#00ab94]"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Call</span>
          </button>
        </div>
      </div>

      <div className={`rounded-3xl border overflow-hidden divide-y ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] divide-[#232733]' : 'bg-white border-gray-200 divide-gray-100 shadow-sm'
      }`}>
        {[...callHistory, ...demoCallLogs].map(log => (
          <div key={log.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                log.status === 'missed' ? 'bg-rose-500/20 text-rose-500' : 'bg-[#00C2A8]/20 text-[#00C2A8]'
              }`}>
                {log.type === 'video' ? <Video className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-bold text-sm">{log.name}</h4>
                <p className="text-xs text-[#9699A6] flex items-center gap-1">
                  <span>{log.time}</span>
                  <span>•</span>
                  <span>{log.duration}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => onStartCall(log.type, log.name)}
              className="p-2.5 rounded-xl hover:bg-white/10 text-[#6C5CE7]"
            >
              {log.type === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CallModal({ call, onToggleMute, onToggleVideo, onEndCall }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between items-center p-6 text-white animate-fade-in">
      {/* Call Header */}
      <div className="text-center pt-8">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 uppercase tracking-widest text-[#00C2A8]">
          Encrypted Mingly {call.type.toUpperCase()} Call
        </span>
        <h2 className="text-2xl font-extrabold mt-3">{call.partnerName}</h2>
        <p className="text-sm text-gray-400 font-mono mt-1">{formatDuration(call.duration)}</p>
      </div>

      {/* Call Centerpiece */}
      <div className="flex flex-col items-center justify-center relative">
        <div className="relative">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#6C5CE7] shadow-2xl relative z-10">
            <img src={call.partnerAvatar} alt={call.partnerName} className="w-full h-full object-cover" />
          </div>
          {/* Animated pulse rings */}
          <div className="absolute inset-0 rounded-full bg-[#6C5CE7] animate-ping opacity-25" />
          <div className="absolute -inset-4 rounded-full border border-[#00C2A8]/40 animate-pulse" />
        </div>

        {call.type === 'video' && (
          <div className="mt-4 text-xs bg-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-[#00C2A8]" />
            <span>HD 1080p Stream Active</span>
          </div>
        )}
      </div>

      {/* Call Controls Bar */}
      <div className="flex items-center gap-4 pb-8">
        <button
          onClick={onToggleMute}
          className={`p-4 rounded-full transition ${
            call.isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          {call.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        {call.type === 'video' && (
          <button
            onClick={onToggleVideo}
            className={`p-4 rounded-full transition ${
              call.isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {call.isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        )}

        <button
          onClick={onEndCall}
          className="p-5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/40 hover:scale-105 transition"
        >
          <PhoneOff className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

function ProfileModal({ theme, user, onClose, onUpdatePresence }) {
  const presenceOptions = [
    '🟢 Available',
    '🔴 Busy',
    '🌙 Do Not Disturb',
    '🎧 Listening',
    '💻 Working',
    '📚 Studying',
    '🏃 Away'
  ];

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(user.minglyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Mingly Identity</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-3xl object-cover ring-2 ring-[#6C5CE7]" />
          <div>
            <h4 className="font-bold text-base">{user.name}</h4>
            <p className="text-xs text-[#6C5CE7] font-semibold">@{user.username}</p>
            <p className="text-[11px] text-[#9699A6]">Member since {user.joined}</p>
          </div>
        </div>

        <p className="text-xs text-[#9699A6] leading-relaxed mb-4">{user.bio}</p>

        {/* Presence Selector */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#9699A6] block mb-2">Set Presence State</label>
          <div className="flex flex-wrap gap-1.5">
            {presenceOptions.map(p => (
              <button
                key={p}
                onClick={() => onUpdatePresence(p, user.customPresence)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                  user.presence === p
                    ? 'bg-[#6C5CE7] text-white'
                    : theme === 'dark' ? 'bg-[#0F1117] text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Shareable Mingly Profile Link Card */}
        <div className={`p-4 rounded-2xl border mb-4 ${
          theme === 'dark' ? 'bg-[#0F1117] border-[#232733]' : 'bg-indigo-50/50 border-indigo-100'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#00C2A8]" />
              <span className="text-xs font-bold">Unique Profile Link</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-[11px] text-[#6C5CE7] font-bold hover:underline"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
          <code className="text-xs text-[#00C2A8] font-mono select-all">
            https://{user.minglyLink}
          </code>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white font-bold text-xs rounded-xl transition"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
}

function GlobalSearchModal({ theme, conversations, circles, messages, onClose, onSelectChat, onSelectCircle }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredChats = conversations.filter(c =>
    `${c.name} ${c.lastMessage} ${c.circle || ''}`.toLowerCase().includes(normalizedQuery)
  );

  const filteredCircles = circles.filter(c =>
    `${c.name} ${c.description}`.toLowerCase().includes(normalizedQuery)
  );

  const filteredMessages = Object.entries(messages).flatMap(([chatId, chatMessages]) => {
    const conversation = conversations.find(chat => chat.id === chatId);
    return chatMessages
      .filter(message => [message.content, message.noteTitle, message.eventTitle, message.trackTitle]
        .filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery))
      .map(message => ({ ...message, chatId, chatName: conversation?.name || 'Conversation' }));
  }).slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center pt-20 p-4">
      <div className={`w-full max-w-lg rounded-3xl p-5 border shadow-2xl ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center gap-3 pb-3 border-b border-inherit">
          <Search className="w-5 h-5 text-[#6C5CE7]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people, circles, messages on Mingly..."
            autoFocus
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-500"
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 max-h-80 overflow-y-auto">
          {/* People & Chats */}
          <div>
            <h5 className="text-[11px] font-bold text-[#9699A6] uppercase tracking-wider mb-2">People & Mingles</h5>
            <div className="space-y-1">
              {filteredChats.map(c => (
                <div
                  key={c.id}
                  onClick={() => onSelectChat(c.id)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                >
                  <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-xs font-bold">{c.name}</p>
                    <p className="text-[10px] text-[#9699A6]">{c.presence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Circles */}
          <div>
            <h5 className="text-[11px] font-bold text-[#9699A6] uppercase tracking-wider mb-2">Circles</h5>
            <div className="space-y-1">
              {filteredCircles.map(cir => (
                <div
                  key={cir.id}
                  onClick={() => onSelectCircle(cir)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                >
                  <span className="text-lg">{cir.emoji}</span>
                  <div>
                    <p className="text-xs font-bold">{cir.name}</p>
                    <p className="text-[10px] text-[#9699A6]">{cir.memberCount} members</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved messages */}
          {query.trim() && (
            <div>
              <h5 className="text-[11px] font-bold text-[#9699A6] uppercase tracking-wider mb-2">Messages</h5>
              <div className="space-y-1">
                {filteredMessages.map(message => (
                  <button
                    key={`${message.chatId}-${message.id}`}
                    onClick={() => onSelectChat(message.chatId)}
                    className="w-full text-left p-2 rounded-xl hover:bg-white/5"
                  >
                    <p className="text-xs font-bold">{message.chatName}</p>
                    <p className="text-[10px] text-[#9699A6] truncate">
                      {message.content || message.noteTitle || message.eventTitle || message.trackTitle}
                    </p>
                  </button>
                ))}
                {filteredMessages.length === 0 && (
                  <p className="text-xs text-[#9699A6] px-2">No matching messages.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationsModal({ theme, notifications, onClose, onMarkAllRead }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00C2A8]" />
            <h3 className="font-bold text-lg">Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {notifications.map(notification => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-2.5 rounded-2xl text-xs ${notification.isRead ? 'bg-black/10 opacity-60' : 'bg-black/20'}`}
              >
                <Bell className="w-4 h-4 text-[#00C2A8] mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium leading-tight">{notification.title}</p>
                  <p className="text-[10px] text-[#9699A6] mt-0.5">{notification.time}</p>
                </div>
              </div>
          ))}
          {notifications.length === 0 && <p className="text-xs text-[#9699A6] text-center py-4">You are all caught up.</p>}
        </div>

        <button
          onClick={onMarkAllRead}
          className="w-full py-2.5 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white text-xs font-bold rounded-xl"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}

function SettingsModal({ theme, setTheme, settings, setSettings, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
        theme === 'dark' ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#6C5CE7]" />
            <h3 className="font-bold text-lg">Mingly Settings</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs mb-6">
          {/* Theme Selector */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-black/20">
            <div>
              <p className="font-bold">Appearance Theme</p>
              <p className="text-[10px] text-[#9699A6]">Current: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
            <button
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
              className="px-3 py-1.5 rounded-lg bg-[#6C5CE7] text-white font-semibold"
            >
              Toggle
            </button>
          </div>

          {/* Read Receipts */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-black/20">
            <div>
              <p className="font-bold">Read Receipts</p>
              <p className="text-[10px] text-[#9699A6]">Show blue checkmarks when messages are seen</p>
            </div>
            <input
              type="checkbox"
              checked={settings.readReceipts}
              onChange={() => setSettings(current => ({ ...current, readReceipts: !current.readReceipts }))}
              className="accent-[#6C5CE7] w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Typing Indicator */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-black/20">
            <div>
              <p className="font-bold">Typing Indicator</p>
              <p className="text-[10px] text-[#9699A6]">Let friends see when you're composing</p>
            </div>
            <input
              type="checkbox"
              checked={settings.typingIndicator}
              onChange={() => setSettings(current => ({ ...current, typingIndicator: !current.typingIndicator }))}
              className="accent-[#6C5CE7] w-4 h-4 cursor-pointer"
            />
          </div>

          {/* 2FA */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-black/20">
            <div>
              <p className="font-bold">Two-Factor Authentication (2FA)</p>
              <p className="text-[10px] text-[#9699A6]">Saved locally; sign-in security needs a backend.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={() => setSettings(current => ({ ...current, twoFactor: !current.twoFactor }))}
              className="accent-[#00C2A8] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#6C5CE7] hover:bg-[#5b4cd1] text-white font-bold text-xs rounded-xl"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function NewConversationModal({ theme, onClose, onCreate }) {
  const [name, setName] = useState('');
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <form
        onSubmit={event => { event.preventDefault(); onCreate(name); }}
        className={`w-full max-w-sm rounded-2xl p-5 border shadow-2xl ${
          isDark ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Start a conversation</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <label htmlFor="new-chat-name" className="block text-xs font-semibold text-[#9699A6] mb-1.5">Name</label>
        <input
          id="new-chat-name"
          autoFocus
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Enter a person or group name"
          className={`w-full text-sm p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#6C5CE7] ${
            isDark ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
          }`}
        />
        <div className="flex justify-end gap-2 mt-5">
          <button type="button" onClick={onClose} className="px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/10">Cancel</button>
          <button type="submit" disabled={!name.trim()} className="px-4 py-2 text-xs font-bold rounded-lg bg-[#6C5CE7] text-white disabled:opacity-50">Create chat</button>
        </div>
      </form>
    </div>
  );
}

function ChatDetailsModal({ theme, chat, onClose, onTogglePin, onMarkUnread }) {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`w-full max-w-sm rounded-2xl p-5 border shadow-2xl ${
        isDark ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg">Conversation details</h3>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded-lg hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center gap-3 mb-5">
          <img src={chat.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div className="min-w-0">
            <p className="font-bold truncate">{chat.name}</p>
            <p className="text-xs text-[#9699A6]">{chat.isGroup ? 'Group conversation' : 'Direct conversation'}</p>
            {chat.circle && <p className="text-xs text-[#00C2A8]">{chat.circle}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <button onClick={onTogglePin} className="w-full text-left px-3 py-2.5 rounded-xl border border-inherit hover:bg-white/5 text-sm">
            {chat.pinned ? 'Unpin conversation' : 'Pin conversation'}
          </button>
          <button onClick={onMarkUnread} className="w-full text-left px-3 py-2.5 rounded-xl border border-inherit hover:bg-white/5 text-sm">
            Mark as unread
          </button>
        </div>
        <p className="text-[11px] text-[#9699A6] mt-4">Changes are stored in this browser only.</p>
      </div>
    </div>
  );
}

function InviteMemberModal({ theme, circle, onClose, onInvite }) {
  const [name, setName] = useState('');
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <form
        onSubmit={event => { event.preventDefault(); if (name.trim()) onInvite(name.trim()); }}
        className={`w-full max-w-sm rounded-2xl p-5 border shadow-2xl ${
          isDark ? 'bg-[#181B24] border-[#232733] text-white' : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">Invite a member</h3>
            <p className="text-xs text-[#9699A6]">{circle.name}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-lg hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <label htmlFor="circle-invite-name" className="block text-xs font-semibold text-[#9699A6] mb-1.5">Name or email</label>
        <input
          id="circle-invite-name"
          autoFocus
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Enter a name or email address"
          className={`w-full text-sm p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#6C5CE7] ${
            isDark ? 'bg-[#0F1117] text-white' : 'bg-gray-100 text-gray-900'
          }`}
        />
        {(circle.invitees || []).length > 0 && (
          <p className="text-xs text-[#9699A6] mt-3">Invited locally: {circle.invitees.join(', ')}</p>
        )}
        <div className="flex justify-end gap-2 mt-5">
          <button type="button" onClick={onClose} className="px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/10">Cancel</button>
          <button type="submit" disabled={!name.trim()} className="px-4 py-2 text-xs font-bold rounded-lg bg-[#6C5CE7] text-white disabled:opacity-50">Save invite</button>
        </div>
      </form>
    </div>
  );
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}