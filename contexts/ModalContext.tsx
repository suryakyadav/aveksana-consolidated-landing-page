import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '../types';

interface ModalContextType {
  isDemoModalOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
  isQuickViewModalOpen: boolean;
  quickViewProduct: Product | null;
  openQuickViewModal: (product: Product) => void;
  closeQuickViewModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDemoModalOpen, setDemoModalOpen] = useState(false);
  const [isQuickViewModalOpen, setQuickViewModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openDemoModal = () => setDemoModalOpen(true);
  const closeDemoModal = () => setDemoModalOpen(false);

  const openQuickViewModal = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewModalOpen(true);
  };

  const closeQuickViewModal = () => {
    setQuickViewModalOpen(false);
    // Delay clearing data for smoother exit animation
    setTimeout(() => {
        setQuickViewProduct(null);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ 
      isDemoModalOpen, 
      openDemoModal, 
      closeDemoModal,
      isQuickViewModalOpen,
      quickViewProduct,
      openQuickViewModal,
      closeQuickViewModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
