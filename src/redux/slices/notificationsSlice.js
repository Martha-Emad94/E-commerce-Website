import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
  },
  reducers: {
    // إضافة إشعار جديد
    addNotification: (state, action) => {
      const { type, title, message, duration = 5000 } = action.payload;
      const newNotification = {
        id: Date.now(),
        type, // 'success', 'error', 'warning', 'info'
        title,
        message,
        timestamp: new Date(),
        read: false,
        duration,
      };

      state.notifications.unshift(newNotification);
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },

    // إزالة إشعار
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },

    // تحديد إشعار كمقروء
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        n => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      }
    },

    // تحديد جميع الإشعارات كمقروءة
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },

    // مسح جميع الإشعارات
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },

    // إزالة الإشعارات المنتهية الصلاحية
    removeExpiredNotifications: (state) => {
      const now = new Date();
      state.notifications = state.notifications.filter(notification => {
        if (notification.duration) {
          const notificationTime = new Date(notification.timestamp);
          const timeDiff = now - notificationTime;
          return timeDiff < notification.duration;
        }
        return true;
      });
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
  removeExpiredNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer; 