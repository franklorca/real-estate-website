// luminousheaven/src/components/AgentProfile.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { toast } from "react-toastify";

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
    return (
      <div className="text-center p-6">
        <p className="text-brand-light text-sm">Loading agent details...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        {agent.profile_picture_url ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md border border-brand-divider">
            <Image
              src={agent.profile_picture_url}
              alt={agent.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-brand-champagne flex items-center justify-center font-serif text-2xl text-brand-dark font-bold">
            {agent.name?.[0]}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-brand-dark">{agent.name}</h3>
          <p className="text-sm text-brand-light">Luminous Heaven Realty</p>
        </div>
      </div>

      {agent.bio && (
        <p className="mt-4 text-sm text-gray-700 italic border-l-4 border-brand-accent/40 pl-4">
          "{agent.bio}"
        </p>
      )}

      <div className="mt-6">
        <h4 className="font-semibold text-brand-dark">
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
                className="w-full p-2.5 border border-brand-divider rounded-md focus:ring-2 focus:ring-brand-accent text-sm"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full p-2.5 border border-brand-divider rounded-md focus:ring-2 focus:ring-brand-accent text-sm"
                required
              />
            </div>
          )}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Hello, I'm interested in this property and would like to schedule a viewing..."
            className="w-full p-2.5 border border-brand-divider rounded-md focus:ring-2 focus:ring-brand-accent text-sm"
            required
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-dark text-white py-3 rounded-lg font-semibold hover:bg-brand-accent transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed uppercase text-xs tracking-wider"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentProfile;
