import { useAuth } from "../context/AuthContext";

const AgentProfile = ({ agentId, propertyId }) => {
  const { user } = useAuth();
  const [agent, setAgent] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!agentId) return;

    const fetchAgent = async () => {
      try {
        const response = await api.get(`/api/agents/${agentId}`);
        setAgent(response.data);
      } catch (error) {
        console.error("Failed to fetch agent profile:", error);
      }
    };
    fetchAgent();
  }, [agentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.warn("Please enter a message for the agent.");
      return;
    }
    if (!user && (!guestName.trim() || !guestEmail.trim())) {
      toast.warn("Please enter your name and email.");
      return;
    }
    setIsSubmitting(true);

    try {
      await api.post("/api/inquiries", {
        propertyId: propertyId,
        message: message,
        guestName: user ? undefined : guestName,
        guestEmail: user ? undefined : guestEmail,
      });

      toast.success("Your inquiry has been sent to the agent!");
      setMessage("");
      setGuestName("");
      setGuestEmail("");
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      toast.error(
        "There was a problem sending your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!agent) {
    // Render a clean loading state while fetching agent details
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">Loading agent details...</p>
      </div>
    );
  }

  return (
    // The main container div was removed from here and moved to the parent (PropertyDetailPage)
    // This makes the component more reusable. Let's add it back for standalone integrity.
    <div>
      <div className="flex items-center space-x-4">
        <img
          src={agent.profile_picture_url}
          alt={agent.name}
          className="w-20 h-20 rounded-full object-cover shadow-md"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-600">Luminous Heaven Realty</p>
        </div>
      </div>

      {agent.bio && (
        <p className="mt-4 text-sm text-gray-700 italic border-l-4 border-gray-200 pl-4">
          "{agent.bio}"
        </p>
      )}

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800">
          Contact This Agent Directly
        </h4>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {!user && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
            </div>
          )}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Hello, I'm interested in this property and would like to schedule a viewing..."
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
            required
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentProfile;
