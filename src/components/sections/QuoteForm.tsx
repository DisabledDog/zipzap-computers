export default function QuoteForm() {
  return (
    <section id="quote-form" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black">
            Get Your <span className="text-yellow-500">Free Quote</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your device and get an instant repair estimate
          </p>
        </div>

        {/* Quote Form Iframe */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <iframe
            id="quoteform"
            src="https://www.myrepairapp.com/quoteform?api_key=zxXl-9OaBeUU7T6_IXF16&bg_color=undefined&text_color=undefined&disabled_categories=&hide_schedule_step=false&hide_create_quote=false&country=US"
            style={{ border: 0, outline: 'none' }}
            frameBorder="0"
            width="100%"
            height="600"
            title="Get Repair Quote"
          />
        </div>
      </div>
    </section>
  )
}