import React, { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import Modal from '../../ui/Modal';
import "../../../../assets/styles/substyles/SocialLinks.css";

const SocialLinks: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [accountToRemove, setAccountToRemove] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { data, error } = await supabase.from('social_accounts').select('*');
        if (error) throw error;
        setAccounts(data || []);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAddAccount = async (platform: string) => {
    try {
      let authUrl = '';
  
      // Define the OAuth flow for different platforms
      switch (platform) {
        case 'facebook':
          authUrl = '/api/auth/facebook'; // Your API endpoint for Facebook OAuth
          break;
        case 'twitter':
          authUrl = '/api/auth/twitter'; // Your API endpoint for Twitter OAuth
          break;
        case 'linkedin':
          authUrl = '/api/auth/linkedin'; // Your API endpoint for LinkedIn OAuth
          break;
        default:
          console.error('Unsupported platform:', platform);
          return;
      }
  
      // Redirect to the authentication URL
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };
  

  const handleRemoveAccount = async () => {
    if (!accountToRemove) return;

    try {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', accountToRemove);
      if (error) throw error;

      setAccounts(accounts.filter((account) => account.id !== accountToRemove));
    } catch (error) {
      console.error('Error removing account:', error);
    } finally {
      setShowModal(false);
      setAccountToRemove(null);
    }
  };

  const renderAccountCards = () => {
    if (loading) {
      return <div className="skeleton-loader">Loading accounts...</div>;
    }

    if (accounts.length === 0) {
      return <p>No accounts linked. Click "Add New Account" to get started.</p>;
    }

    return accounts.map((account) => (
      <div key={account.id} className="account-card">
        <img
          src={`/assets/logos/${account.platform}.png`}
          alt={`${account.platform} logo`}
          className="platform-logo"
        />
        <h3>{account.username}</h3>
        <p>Status: {account.status ? 'Connected' : 'Disconnected'}</p>
        <button
          className="manage-btn"
          onClick={() => console.log(`Manage ${account.platform} account`)}
        >
          Manage
        </button>
        <button
          className="remove-btn"
          onClick={() => {
            setAccountToRemove(account.id);
            setShowModal(true);
          }}
        >
          Remove
        </button>
      </div>
    ));
  };

  return (
    <div className="social-links">
      <div className="header">
        <h1>Social Media Accounts</h1>
        <button className="add-account-btn" onClick={() => handleAddAccount('generic')}>
          Add New Account
        </button>
      </div>
      <div className="account-grid">{renderAccountCards()}</div>

      {showModal && (
        <Modal
          title="Confirm Removal"
          onClose={() => setShowModal(false)}
          onConfirm={handleRemoveAccount}
        >
          Are you sure you want to remove this account? This action cannot be undone.
        </Modal>
      )}
    </div>
  );
};

export default SocialLinks;
