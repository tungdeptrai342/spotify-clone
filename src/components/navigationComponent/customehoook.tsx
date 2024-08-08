import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigationHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState(['/']);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Xóa lịch sử điều hướng khi reload lại trang
  useEffect(() => {
    localStorage.removeItem('navigationHistory');
    localStorage.removeItem('navigationIndex');
  }, []);

  useEffect(() => {
    if (location.pathname !== history[currentIndex]) {
      setHistory((prev) => {
        const newHistory = [...prev.slice(0, currentIndex + 1), location.pathname];
        localStorage.setItem('navigationHistory', JSON.stringify(newHistory));
        return newHistory;
      });
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        localStorage.setItem('navigationIndex', newIndex.toString());
        return newIndex;
      });
    }
  }, [location.pathname]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const goBack = () => {
    if (canGoBack) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      localStorage.setItem('navigationIndex', newIndex.toString());
      navigate(history[newIndex]);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      localStorage.setItem('navigationIndex', newIndex.toString());
      navigate(history[newIndex]);
    }
  };

  return { canGoBack, canGoForward, goBack, goForward };
};
