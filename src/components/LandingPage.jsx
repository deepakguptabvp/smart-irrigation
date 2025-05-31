import React from 'react'

const LandingPage = () => {

      const [activeSection, setActiveSection] = useState("tenders");


      const renderContent = () => {
    switch (activeSection) {
      case "my-biddings":
        return <MyBiddings bids={bids} />;
      case "create-bid":
        return <CreateBid setActiveSection={setActiveSection} createBid={createBid} setBids={setBids} />;
      case "tenders":
        return <TendersPage setCreateBid={setCreateBid} setActiveSection={setActiveSection} />;
      case "edit-profile":
        return <EditProfile setSupplier={setSupplier} setActiveSection={setActiveSection} />;
      case "my-profile":
        return <SupplierProfile supplier={supplier} />;
      case "chats":
        return <ChatInterface />;
      case "notifications":
        return <Notifications />;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div>LandingPage</div>
  )
}

export default LandingPage