const Contact = () => {
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 animate-on-scroll">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-on-scroll">
            Have questions about our federation, tournaments, or membership? 
            We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-on-scroll">
          <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll card">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-on-scroll">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 animate-on-scroll">
              Email Us
            </h3>
            <p className="text-gray-600 mb-3 animate-on-scroll">
              Get in touch via email
            </p>
            <a 
              href="mailto:info@pickleballfederation.com" 
              className="text-blue-600 hover:text-blue-700 font-medium animate-on-scroll"
            >
              info@pickleballfederation.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll card">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-on-scroll">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 animate-on-scroll">
              Call Us
            </h3>
            <p className="text-gray-600 mb-3 animate-on-scroll">
              Speak with our team
            </p>
            <a 
              href="tel:+1-800-PICKLE" 
              className="text-blue-600 hover:text-blue-700 font-medium animate-on-scroll"
            >
              1-800-PICKLE
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll card">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-on-scroll">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 animate-on-scroll">
              Visit Us
            </h3>
            <p className="text-gray-600 mb-3 animate-on-scroll">
              Our headquarters
            </p>
            <p className="text-gray-600 text-sm animate-on-scroll">
              123 Pickleball Way<br />
              Phoenix, AZ 85001
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16 animate-on-scroll card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center animate-on-scroll">
            Send Us a Message
          </h2>
          <form className="max-w-2xl mx-auto animate-on-scroll">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="animate-on-scroll">
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 animate-on-scroll"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="animate-on-scroll">
                <label 
                  htmlFor="lastName" 
                  className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 animate-on-scroll"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div className="mb-6 animate-on-scroll">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 animate-on-scroll"
                placeholder="Enter your email address"
              />
            </div>

            <div className="mb-6 animate-on-scroll">
              <label 
                htmlFor="subject" 
                className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll"
              >
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 animate-on-scroll"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="membership">Membership Questions</option>
                <option value="tournaments">Tournament Information</option>
                <option value="technical">Technical Support</option>
                <option value="feedback">Feedback & Suggestions</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6 animate-on-scroll">
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 animate-on-scroll"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <div className="text-center animate-on-scroll">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium hover:-translate-y-1 hover:scale-105 active:scale-95 animate-on-scroll"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Office Hours & Support */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-on-scroll">
          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 animate-on-scroll">
              Office Hours
            </h3>
            <div className="space-y-2 animate-on-scroll">
              <div className="flex justify-between animate-on-scroll">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM MST</span>
              </div>
              <div className="flex justify-between animate-on-scroll">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM MST</span>
              </div>
              <div className="flex justify-between animate-on-scroll">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 animate-on-scroll">
              * Extended hours during tournament seasons
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 animate-on-scroll">
              Support Response Times
            </h3>
            <div className="space-y-2 animate-on-scroll">
              <div className="flex justify-between animate-on-scroll">
                <span className="text-gray-600">Email Support</span>
                <span className="font-medium">Within 24 hours</span>
              </div>
              <div className="flex justify-between animate-on-scroll">
                <span className="text-gray-600">Phone Support</span>
                <span className="font-medium">Immediate</span>
              </div>
              <div className="flex justify-between animate-on-scroll">
                <span className="text-gray-600">Technical Issues</span>
                <span className="font-medium">Within 48 hours</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 animate-on-scroll">
              * Premium members get priority support
            </p>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16 animate-on-scroll card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center animate-on-scroll">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 animate-on-scroll">
            {[
              {
                question: "How do I join the Pickleball Federation?",
                answer: "You can join online through our membership portal. We offer several membership tiers starting with a free plan."
              },
              {
                question: "What tournaments are available for beginners?",
                answer: "We offer tournaments for all skill levels, including special beginner-friendly events and clinics."
              },
              {
                question: "How do I find courts near me?",
                answer: "Use our court locator system to find public and private courts in your area with real-time availability."
              },
              {
                question: "Can I get a refund on my membership?",
                answer: "Yes, we offer a 30-day money-back guarantee on all paid membership plans."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-102 animate-on-scroll"
              >
                <h4 className="font-semibold text-gray-900 mb-2 animate-on-scroll">
                  {faq.question}
                </h4>
                <p className="text-gray-600 text-sm animate-on-scroll">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 animate-on-scroll">
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 animate-on-scroll">
              View All FAQs →
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center animate-on-scroll card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 animate-on-scroll">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6 animate-on-scroll">
            Join our federation to get priority support and access to our comprehensive help center.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 animate-on-scroll">
              Join Federation
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 animate-on-scroll">
              View Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 