import { toast } from 'react-hot-toast';

const useToast = () => {
  const showToast = (type = 'success', message,options = {}) => {
    toast[type](message, { ...options, position: 'top-center' });
  };

  return {
    showToast,
  };
};

export default useToast;
