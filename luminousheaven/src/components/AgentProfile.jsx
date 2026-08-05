// luminousheaven/src/components/AgentProfile.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { toast } from "react-toastify";
import { Lock, Sparkles } from "lucide-react";

const AgentProfile = ({ agentId, propertyId, propertyIdentifier }) => {
  const { user } = useAuth();
  const [agent, setAgent] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirectingCheckout, setIsRedirectingCheckout] = useState(false);
  const [isFeeEnabled, setIsFeeEnabled] = useState(true);

  const isMember = user && user.membership_status === "active";
  const isLocked = isFeeEnabled && !isMember;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("/api/settings");
        if (typeof response.data?.membership_fee_enabled === "boolean") {
          setIsFeeEnabled(response.data.membership_fee_enabled);
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      }
    };
    fetchSettings();
  }, []);

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

  const handleCheckout = async () => {
    if (!user) {
      toast.info("Please sign in or join the club to become a member.");
      return;
    }

    setIsRedirectingCheckout(true);
    try {
      const response = await api.post("/api/stripe/create-checkout-session", {
        propertyIdentifier,
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Could not initiate checkout session.");
        setIsRedirectingCheckout(false);
      }
    } catch (error) {
      console.error("Checkout initiation error:", error);
      toast.error(
        error.response?.data?.message || "Failed to start Stripe checkout."
      );
      setIsRedirectingCheckout(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.warn("Please enter a message for the agent.");
      return;
    }
    setIsSubmitting(true);

    try {
      await api.post("/api/inquiries", {
        propertyId: propertyId,
        message: message,
      });

      toast.success("Your inquiry has been sent to the agent!");
      setMessage("");
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
        <p className="text-brand-light text-sm font-sans">Loading agent details...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Blurred container when Membership Gate is locked */}
      <div
        className={
          isLocked
            ? "filter blur-md select-none pointer-events-none opacity-40 transition-all duration-500"
            : "transition-all duration-500"
        }
      >
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
            <h3 className="text-xl font-bold font-serif text-brand-dark">
              {agent.name}
            </h3>
            <p className="text-sm font-sans text-brand-light">
              Luminous Heaven Realty
            </p>
            {!isLocked && agent.phone && (
              <p className="text-xs font-sans text-brand-accent mt-1 font-semibold">
                Direct Tel: {agent.phone}
              </p>
            )}
            {!isLocked && agent.email && (
              <p className="text-xs font-sans text-brand-dark font-mono">
                {agent.email}
              </p>
            )}
          </div>
        </div>

        {agent.bio && (
          <p className="mt-4 text-sm font-sans text-gray-700 italic border-l-4 border-brand-accent/40 pl-4">
            "{agent.bio}"
          </p>
        )}

        <div className="mt-6">
          <h4 className="font-semibold font-serif text-brand-dark">
            Contact This Agent Directly
          </h4>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
              disabled={isSubmitting || isLocked}
              className="w-full bg-brand-dark text-white py-3 rounded-lg font-semibold hover:bg-brand-accent transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed uppercase text-xs tracking-wider"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>

      {/* Lock Overlay for Non-Members when Membership Gate is Enabled */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-md rounded-xl border border-brand-accent/30 shadow-2xl text-center">
          <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-brand-accent/15 text-brand-accent mb-3">
            <Sparkles className="w-3 h-3 mr-1.5" /> Members Only
          </span>

          <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">
            Unlock Agent Contact & Dossier
          </h3>

          <p className="font-sans text-xs text-brand-light leading-relaxed max-w-xs mb-6">
            Direct agent communications, private phone lines, and off-market viewing requests are reserved exclusively for active club members.
          </p>

          <div className="bg-brand-champagne/40 border border-brand-accent/20 rounded-lg p-3 w-full max-w-xs mb-6 flex items-center justify-between">
            <div className="text-left">
              <p className="text-[10px] font-sans uppercase tracking-widest text-brand-light">
                Membership Fee
              </p>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-2xl font-bold text-brand-dark">$30</span>
                <span className="font-sans text-xs text-gray-400 line-through">$50</span>
              </div>
            </div>
            <span className="text-[10px] font-bold font-sans uppercase tracking-wider bg-brand-accent text-white px-2.5 py-1 rounded">
              SAVE $20
            </span>
          </div>

          {user ? (
            <button
              onClick={handleCheckout}
              disabled={isRedirectingCheckout}
              className="w-full max-w-xs py-3 px-4 bg-brand-accent hover:bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400"
            >
              {isRedirectingCheckout ? "Redirecting to Stripe..." : "Unlock Membership — $30"}
            </button>
          ) : (
            <div className="w-full max-w-xs space-y-2">
              <Link
                href={`/login?from=/properties/${propertyIdentifier || ""}`}
                className="block w-full py-3 px-4 bg-brand-accent hover:bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg transition-colors text-center"
              >
                Sign In to Unlock ($30)
              </Link>
              <Link
                href={`/signup?from=/properties/${propertyIdentifier || ""}`}
                className="block w-full text-center font-sans text-xs text-brand-dark hover:text-brand-accent font-semibold pt-1"
              >
                New here? Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentProfile;
