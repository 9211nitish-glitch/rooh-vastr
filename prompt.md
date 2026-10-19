# ROOH VASTR — COMPLETE MASTER PROMPT FOR WEBSITE DEVELOPMENT

Act as a senior full-stack engineer, UI/UX designer, e-commerce architect, SEO specialist, AI integration engineer, database designer, and security engineer.

Your task is to plan, design, develop, test, and deploy a complete, production-oriented e-commerce platform for my brand, ROOH VASTR.

Do not create just a landing page or static frontend. Build a complete, database-connected application with a customer storefront, secure admin dashboard, product management, checkout, order management, custom-order workflows, blog management, SEO infrastructure, and configurable AI features.

Build the application in phases, keeping the project functional and deployable throughout development.

---

# 1. BRAND IDENTITY AND BUSINESS VISION

Brand name: ROOH VASTR

Brand positioning:
A premium, contemporary Indian personalized gifting and custom merchandise brand where customers can purchase ready-designed products or request customized printing.

Primary tagline:
"Wear Your Story. Gift Your Feelings."

Alternative campaign tagline:
"Made Personal. Made Meaningful."

Brand personality:
- Premium
- Creative
- Modern Indian
- Emotional and thoughtful
- Youthful but sophisticated
- Trustworthy
- Personal and expressive

The brand must not look like a generic marketplace, a basic printing shop, or a template-based dropshipping store.

Create a distinct brand identity that can grow beyond apparel into a broad personalized gifting and merchandise business.

Products and categories may include:
- Customized T-shirts
- Polo T-shirts
- Hoodies and sweatshirts
- Printed mugs and cups
- Customized cushions and pillows
- Personalized keychains
- Photo frames
- Water bottles
- Phone cases
- Posters and wall art
- Photo gifts
- Birthday gifts
- Anniversary gifts
- Couple gifts
- Friendship gifts
- Festival gifts
- Personalized accessories
- Corporate gifts
- Bulk merchandise
- Other approved products added by the administrator

All product categories must be database-driven and manageable through the admin panel.

# 2. TECHNOLOGY STACK — NO PHP

Use the following stack:

Frontend and application:
- Next.js with App Router
- React
- TypeScript with strict mode
- Tailwind CSS
- shadcn/ui
- Lucide icons
- Motion or Framer Motion for subtle animations

Backend:
- Next.js Server Components
- Next.js Route Handlers
- Server Actions where appropriate
- Supabase PostgreSQL
- Supabase Authentication
- Supabase Storage
- Supabase Row Level Security

Hosting and development:
- GitHub for source control
- Vercel for application hosting and deployment
- Supabase for database, authentication, and storage

Integrations:
- Razorpay for online payments, when configured and approved
- WhatsApp Business Platform or a supported chatbot provider
- An AI API provider for blog drafts and product recommendations
- Resend or another compatible email service, if configured
- Google Search Console and analytics integrations when available

Do not use PHP anywhere.

Do not introduce an unnecessary separate backend server if Next.js Route Handlers and Supabase can handle the requirement reliably.

Use a maintainable service layer so external providers can be changed later.

Prefer free-tier services initially, but verify current plan limits. Do not assume that AI usage, WhatsApp automation, email, payment processing, scheduled jobs, or production traffic are unlimited or permanently free.

# 3. BRAND DESIGN SYSTEM

Create a premium minimal design system.

Recommended color palette:
- Deep Burgundy: #6D1835
- Warm Ivory: #FAF7F2
- Charcoal Black: #242124
- Muted Rose: #C98F9F
- Soft Beige: #EAE0D5
- White: #FFFFFF

Use burgundy for primary actions and important brand accents. Use ivory and white for backgrounds, charcoal for readable text, and muted rose or beige for restrained highlights.

Typography:
- Use an elegant serif font for selected headings.
- Use a highly readable sans-serif font for body text and interfaces.
- Use consistent type scales and font weights.
- Optimize font loading and avoid layout shifts.

Logo system:
- Primary logo: ROOH VASTR wordmark.
- Secondary logo: RV monogram.
- Use the monogram for the favicon, social media profile, packaging labels, and compact mobile placements.
- Keep the logo legible at small sizes.
- Do not distort the logo or place it on backgrounds with insufficient contrast.

UI direction:
- Premium minimalism as the foundation.
- Use glassmorphism sparingly for a floating assistant or selected overlays.
- Avoid excessive glass effects, heavy blur, overuse of gradients, and unnecessary animations.
- Use generous whitespace, beautiful product photography, balanced grids, and clear product hierarchy.
- Product images must be the visual focus.
- Use subtle hover effects, lightweight transitions, and polished loading states.
- Respect reduced-motion preferences.

The website should feel premium on mobile as well as desktop.

Create reusable components for:
- Buttons
- Product cards
- Product image galleries
- Category cards
- Navigation
- Search
- Filters
- Modals
- Forms
- Badges
- Breadcrumbs
- Toast notifications
- Loading skeletons
- Error states
- Empty states
- Admin tables
- Pagination

Do not generate arbitrary UI styles separately for every page. Establish a consistent design system first.

# 4. PUBLIC WEBSITE STRUCTURE

Create these pages:

1. Homepage
2. Shop All
3. Category Listing
4. Subcategory Listing
5. Product Details
6. Search Results
7. Wishlist
8. Cart
9. Checkout
10. Order Confirmation
11. Order Tracking
12. Customer Account
13. Login and Registration
14. Custom Printing Services
15. Bulk and Corporate Orders
16. About Rooh Vastr
17. Contact Us
18. FAQ
19. Blog Listing
20. Blog Category
21. Blog Article
22. Shipping Policy
23. Returns and Refund Policy
24. Privacy Policy
25. Terms and Conditions
26. Sitemap
27. Custom 404 Page

Use clean, readable, stable URLs.

Suggested URL patterns:
- /shop
- /category/personalized-mugs
- /category/custom-tshirts
- /product/personalized-photo-mug
- /custom-printing
- /bulk-orders
- /blog
- /blog/personalized-gift-ideas
- /about
- /contact
- /account
- /orders/track

Generate slugs from content and ensure uniqueness.

# 5. HOMEPAGE DESIGN

Create a polished homepage with the following configurable sections:

1. Announcement bar
2. Responsive header
3. Hero banner or carousel
4. Featured categories
5. Bestselling products
6. Personalized gifts collection
7. Custom T-shirt collection
8. Mugs, cushions, and keychains
9. Gifts by occasion
10. Gifts by recipient
11. Gifts by budget
12. New arrivals
13. Custom Printing / Print-on-Demand section
14. How Custom Ordering Works
15. Promotional banners between sections
16. Seasonal and festival collections
17. Bulk and corporate merchandise
18. Customer reviews
19. Recently viewed products
20. Frequently asked questions
21. Latest blog articles
22. Newsletter signup
23. Footer

Do not force every section to appear on every homepage configuration. The administrator should be able to choose and arrange the layout.

Homepage builder requirements:
- Enable or disable any section.
- Reorder sections using an intuitive interface.
- Edit section titles and descriptions.
- Select categories and products.
- Upload promotional banners.
- Add desktop and mobile banner variants.
- Configure banner links and call-to-action buttons.
- Schedule campaign start and end dates.
- Preview changes before publishing.
- Save drafts and publish approved configurations.
- Show the appropriate live configuration to visitors.

Store homepage configuration in Supabase. Avoid hardcoding the complete homepage layout.

# 6. PRODUCT CATALOG AND PRODUCT MANAGEMENT

Every product must support:

- Product name
- Unique slug
- SKU
- Category
- Subcategory
- Short description
- Detailed description
- Regular price
- Sale price
- Product images
- Image gallery
- Image alt text
- Available colors
- Available sizes
- Material
- Dimensions
- Weight
- Product specifications
- Stock quantity
- Inventory tracking
- Variant-specific prices and SKUs
- Tags
- Related products
- Featured status
- Bestseller status
- Publication status
- SEO title
- Meta description
- Canonical URL
- Product structured data
- Shipping information
- Return eligibility

Only authorized administrators can access cost prices, supplier information, and other confidential business fields.

Support product types:
- Ready-made products
- Products with selectable variants
- Personalized products
- Custom-printing services
- Bulk-order products

Administrators must be able to add, edit, archive, publish, unpublish, and manage products without editing source code.

Product image uploads must support validation, size limits, and appropriate storage policies.

# 7. PRODUCT DETAILS PAGE — TWO SEPARATE PURCHASE FLOWS

This is a critical requirement.

Each product details page should contain:
- Product image gallery
- Product title
- Price and valid sale price
- Variant selectors
- Quantity selector
- Availability
- Description
- Specifications
- Delivery estimate
- Return information
- Reviews, where available
- Related products
- Frequently asked questions
- Breadcrumb navigation

Show two clear primary actions.

## A. BUY NOW

This is for ready-made designs.

When a customer clicks Buy Now:
1. Validate the selected variant.
2. Validate the quantity and stock.
3. Use the server-calculated price.
4. Add the product to the cart or proceed to checkout.
5. Preserve the selected product configuration.
6. Allow guest checkout.
7. Continue through the normal payment process.

Do not redirect ready-made purchases to WhatsApp.

## B. CUSTOMIZE / PRINT ON DEMAND

This is for customers who want their own design or a personalized print.

When clicked:
1. Explain the available custom-printing services.
2. Show supported products and basic ordering instructions.
3. Display a clear "Continue on WhatsApp" button.
4. Open the configured WhatsApp chatbot or supported click-to-chat fallback.
5. Prefill a contextual message containing the product or service name and relevant URL.
6. Start the guided custom-order conversation.

IMPORTANT:
Do not build an automatic design-preview editor in the initial version.

Do not generate or show an automatic custom product mockup.

After the customer shares the required information, I will manually prepare and send the preview. The admin dashboard must support uploading that preview, recording its status, and tracking customer approval.

The ready-made and custom-order workflows must remain distinct throughout the application.

# 8. CUSTOM PRINTING SERVICES PAGE

Create a dedicated page for custom printing.

Show configurable service cards such as:
- Custom T-shirt printing
- Custom mug printing
- Personalized cushion printing
- Photo gifts
- Custom keychains
- Corporate merchandise
- Bulk printing
- Other services configured by the administrator

Each service should support:
- Service name
- Description
- Supported product types
- Materials
- Printing methods, if applicable
- Minimum quantity, if applicable
- Indicative pricing, when configured
- Typical processing time
- Service images
- FAQs
- SEO metadata
- WhatsApp call to action

Never invent technical printing specifications or prices. Show only configured and verified information.

# 9. WHATSAPP CHATBOT AND CUSTOM-ORDER WORKFLOW

Create a guided custom-order conversation.

The chatbot should ask relevant questions:
- Which product do you want?
- What quantity do you need?
- Which sizes or colors?
- What design or text should be printed?
- Do you have a reference image?
- What is your budget?
- What is your delivery locality or postal code?
- When do you need the product?
- Are there any additional requirements?

Collect only the information needed to process the request.

Conversation flow:
1. Customer chooses a custom product.
2. Website opens WhatsApp.
3. Chatbot gathers requirements.
4. Customer submits relevant information and reference files when supported.
5. System summarizes the request.
6. A custom-order record is created through the configured backend integration.
7. Administrator reviews the request.
8. Administrator prepares the preview manually.
9. Administrator sends the preview and quotation.
10. Customer approves or requests changes.
11. Administrator confirms the final order.
12. Payment and fulfillment proceed through the appropriate workflow.

Custom-order statuses:
- New
- In Discussion
- Awaiting Details
- Quote Pending
- Quote Sent
- Preview Pending
- Preview Sent
- Revision Requested
- Awaiting Approval
- Approved
- Payment Pending
- Confirmed
- In Production
- Shipped
- Completed
- Cancelled

Each record should contain:
- Unique request ID
- Customer contact information
- Product or service
- Quantity
- Variants
- Design instructions
- Reference attachments
- Delivery requirements
- Quotation
- Internal notes
- Status
- Timestamps
- Conversation reference, when available

Integrate WhatsApp Business Platform or a supported provider for automated inbound messages, outbound messages, and webhooks.

A wa.me link alone is not a fully automated chatbot. If WhatsApp API credentials are unavailable, provide a working click-to-chat fallback and document the manual steps.

Do not claim that an order is confirmed or a preview has been delivered unless the relevant action succeeds.

# 10. CART AND CHECKOUT

Create a functional shopping cart supporting:
- Multiple products
- Product variants
- Quantity changes
- Item removal
- Stock validation
- Subtotals
- Coupon discounts
- Shipping charges
- Applicable taxes
- Final total

Checkout should support:
- Guest checkout
- Customer name
- Mobile number
- Email address when required by the configured workflow
- Delivery address
- City
- State
- Postal code
- Billing address if needed
- Order notes
- Shipping method
- Coupon application
- Payment method
- Final order summary

Avoid forcing account creation before purchase.

Allow users to create an account later to access order history and saved addresses.

Payment options:
- Full payment online
- Optional advance payment, only when configured
- Remaining balance tracking for applicable orders

Do not enable payment modes that have not been implemented and tested.

Use Razorpay when properly configured.

Payment requirements:
- Server-side order creation
- Server-side signature verification
- Verified payment webhooks
- Idempotent event processing
- Duplicate callback protection
- Correct handling of pending and failed payments
- Refund tracking where supported
- Order creation consistency
- No client-trusted prices
- No fake payment success states

A browser redirect alone must never be treated as proof of payment.

# 11. SECURE COUPON AND EXIT-INTENT SYSTEM

Create a coupon-management system controlled by administrators.

Coupon configuration:
- Coupon code
- Percentage or fixed discount
- Start date
- Expiration date and time
- Minimum order value
- Maximum discount
- Eligible products and categories
- Usage limit
- Per-customer usage limit
- Customer eligibility
- Campaign identifier
- Active/inactive status

Implement an exit-intent promotional offer.

When a customer has meaningfully explored the website and appears likely to leave, show a small, attractive promotional modal.

Example message:

"Before you go, here's a little something for your next gift."

Offer details must be truthful and configurable.

Admin controls:
- Enable or disable the feature
- Offer message
- Coupon
- Discount
- Expiration duration
- Trigger conditions
- Cooldown period
- Campaign dates
- Target products
- Display frequency

Desktop:
Use a conservative mouse-exit trigger.

Mobile:
Use a suitable engagement-based trigger. Do not block the browser's back button or trap the customer.

Rules:
- Do not show the popup repeatedly on every page.
- Respect dismissals and cooldowns.
- Do not create endless coupon codes.
- Use a stable offer assignment for the intended visitor where possible.
- Validate coupon eligibility on the server.
- Enforce expiration using server-controlled timestamps.
- Reject expired coupons at checkout.
- Enforce redemption limits atomically.
- Clearly communicate coupon restrictions.
- Never use fake countdowns or false scarcity.

The customer must not receive a discount that the backend has not validated.

# 12. CUSTOMER EXPERIENCE FEATURES

Implement:
- Search autocomplete
- Product filters
- Price range
- Category filters
- Occasion filters
- Recipient filters
- Size and color filters
- Sorting
- Pagination
- Recently viewed products
- Wishlist
- Related products
- Similar product recommendations
- Delivery information
- Useful empty states
- Mobile-friendly navigation

Create an AI Gift Finder.

Ask optional questions:
- Who is the gift for?
- What is the occasion?
- What is the budget?
- What product type is preferred?
- What style or theme is desired?

Recommend products that actually exist in the database.

Use current product data and verified prices. Do not invent products, stock, coupons, or discounts.

Provide normal search functionality when AI is unavailable.

AI responses should be concise, helpful, and grounded in the catalog.

# 13. SECURE ADMIN DASHBOARD

Create a protected /admin dashboard.

Only authorized administrators may access administrative operations.

## Dashboard Overview
- Total orders
- Paid revenue
- Pending payments
- Order status summary
- Recent orders
- Custom-order requests
- Low-stock products
- Coupon usage
- Blog generation status
- Recent activity

## Product Management
- Add and edit products
- Upload product images
- Manage variants
- Manage prices
- Manage stock
- Manage categories
- Manage tags
- Publish or unpublish products
- Configure SEO metadata

## Category Management
- Create categories and subcategories
- Upload category images
- Edit descriptions
- Manage ordering
- Configure SEO fields

## Homepage Builder
- Add and remove sections
- Change section headings
- Change descriptions
- Reorder sections
- Select products and categories
- Upload promotional banners
- Set banner links
- Configure call-to-action buttons
- Schedule campaigns
- Preview before publishing

## Order Management
- View orders
- View customer details according to permissions
- View order items
- Track payment status
- Update fulfillment status
- Add internal notes
- Record shipment details
- Record tracking information
- Manage refunds through supported payment workflows
- Export authorized reports

## Custom Orders
- View incoming requests
- Review requirements
- Add quotations
- Upload manually created previews
- Record preview delivery
- Record revisions
- Record customer approval
- Track production and shipping
- Add private internal notes

## Coupon Management
- Create coupons
- Set eligibility
- Configure validity
- Configure usage limits
- Manage promotional campaigns
- Enable or disable exit-intent offers
- View redemption statistics

## Blog Management
- Create posts manually
- Generate AI drafts
- Edit drafts
- Preview articles
- Approve or reject drafts
- Schedule publication
- Publish or unpublish
- Manage categories and tags
- Upload featured images
- Configure SEO metadata
- Manage internal links

## Website Content
- About page
- Contact details
- FAQs
- Policies
- Announcement bar
- Homepage sections
- Footer links
- Social links
- Service pages

## Settings
- Brand name and logo
- RV monogram
- Brand colors
- Contact information
- WhatsApp configuration
- Payment integration status
- Shipping settings
- Tax settings
- SEO defaults
- AI provider configuration
- Blog automation settings
- Notification settings

Use real database-backed functionality. Do not create buttons that only change the visual interface without saving the relevant changes.

# 14. AI BLOG AUTOMATION — FOUR DRAFTS DAILY

Implement an AI-powered blog drafting system.

The system should be configurable to generate up to four new blog drafts per day.

Do not assume the automation can run four times daily on every hosting plan. Check the current scheduling limits and select a supported implementation.

The blog system must:
1. Read published products and categories.
2. Read relevant current product information.
3. Review existing blog topics.
4. Generate useful topic ideas.
5. Identify duplicate or overly similar topics.
6. Prioritize real customer search intent.
7. Generate original, helpful articles.
8. Include an SEO title.
9. Include a URL slug.
10. Include a meta description.
11. Include a structured heading outline.
12. Include the article body.
13. Suggest relevant internal links.
14. Recommend existing products where appropriate.
15. Generate relevant FAQs when useful.
16. Save the draft in Supabase.
17. Record the generation run.
18. Notify the administrator.
19. Wait for administrator approval.

Potential blog topics:
- Personalized gift ideas for birthdays
- Customized gifts for couples
- Best personalized mugs for friends
- Custom T-shirt design ideas
- Photo cushion gift ideas
- Affordable personalized gifts
- Corporate merchandise ideas
- Festival gifting guides
- Personalized gifts for family
- Printing and product-care guides

Do not generate thin, repetitive pages just to target keywords.

AI content must:
- Be useful to real readers
- Avoid fabricated facts
- Avoid fabricated reviews
- Use actual products and valid links
- Avoid keyword stuffing
- Be edited when necessary
- Avoid copied or near-duplicate content

Default behavior:
Generate drafts only. Do not automatically publish without administrator approval.

Admin configuration:
- Number of drafts per day
- Topic categories
- Preferred language
- Editorial guidelines
- Article length
- Scheduled run settings
- AI provider
- Generation limits
- Enable/disable automation

Implement a scheduled server-side job or supported external scheduler.

Use authenticated scheduled endpoints, execution logs, retries, and duplicate prevention.

Protect against repeated generation after failed requests.

The four-drafts-per-day setting must be a maximum, not a guarantee that generation will succeed regardless of provider availability or quota.

# 15. SEO AND SEARCH ENGINE OPTIMIZATION

Implement SEO as part of the architecture, not as a later cosmetic addition.

## Metadata
- Unique page titles
- Unique meta descriptions
- Canonical URLs
- Open Graph metadata
- Social sharing metadata
- Appropriate robots directives
- Image alt text
- Descriptive page headings

## Structured Data
Implement valid JSON-LD when appropriate:
- Organization
- WebSite
- BreadcrumbList
- Product
- Offer
- Article or BlogPosting
- LocalBusiness only when justified by accurate business information
- FAQPage only when applicable and compliant with current search guidelines

Structured data must match visible page content.

Never invent product prices, availability, reviews, ratings, shipping promises, or business details.

## Technical SEO
- XML sitemap generation
- robots.txt
- Clean URLs
- Server-rendered product pages
- Server-rendered blog content
- Breadcrumb navigation
- Internal linking
- Correct HTTP status codes
- Redirects for changed URLs
- Pagination and canonical handling
- Duplicate URL prevention
- Appropriate index/noindex rules
- Fast page loading

## Content SEO
- Useful category descriptions
- Detailed product descriptions
- Informative blog articles
- Helpful FAQs
- Related product links
- Relevant contextual internal links
- Clear company and contact information
- Consistent product specifications

## AI READABILITY
Make content understandable to search engines and AI assistants through:
- Semantic HTML
- Accurate product names
- Clear descriptions
- Consistent specifications
- Accurate prices and stock information
- Structured headings
- Valid structured data
- Descriptive links
- Useful FAQs
- Crawlable public content
- Clear brand information

Do not assume that special AI markup guarantees visibility in ChatGPT or other AI search systems.

Prioritize factual accuracy, useful content, technical accessibility, and discoverability.

# 16. ADMIN ROLES AND AUTHORIZATION

Start with:
- Administrator
- Customer

Design the authorization system so future roles such as content editor, order manager, and customer-support agent can be added.

Implement:
- Protected admin routes
- Server-side role checks
- Supabase RLS policies
- Restricted image uploads
- Restricted database mutations
- Secure authentication sessions
- Audit logging for sensitive actions

Never trust a client-supplied role or a hidden frontend button as authorization.

Provide an explicit, secure procedure for creating the first administrator. Never publish default admin credentials in the source code.

# 17. DATABASE DESIGN

Use PostgreSQL with migrations, foreign keys, constraints, and appropriate indexes.

Design normalized tables for:
- profiles
- user_roles
- addresses
- categories
- products
- product_images
- product_variants
- inventory
- product_tags
- product_tag_assignments
- carts
- cart_items
- wishlists
- wishlist_items
- orders
- order_items
- payments
- payment_webhook_events
- coupons
- coupon_redemptions
- promotional_campaigns
- customer_offer_assignments
- custom_order_requests
- custom_order_attachments
- homepage_sections
- homepage_banners
- blog_categories
- blog_posts
- blog_tags
- blog_post_tag_assignments
- blog_generation_runs
- blog_generation_logs
- reviews
- newsletter_subscriptions
- site_settings
- audit_logs

Use appropriate UUIDs, timestamps, status fields, unique constraints, foreign keys, and indexes.

Store prices using a suitable exact numeric representation. Never use floating-point arithmetic for authoritative financial calculations.

Design a reliable order and payment workflow that handles retries, failures, and duplicate events.

Do not expose secrets through public database policies.

Add database migrations and a reproducible setup process.

# 18. PERFORMANCE AND MOBILE RESPONSIVENESS

Optimize for:
- Mobile phones
- Tablets
- Desktop browsers
- Slower network connections
- Search engine crawlers

Implement:
- Responsive layouts
- Optimized images
- Responsive image sizes
- Lazy loading below the fold
- Efficient database queries
- Appropriate caching
- Optimized fonts
- Minimal unnecessary client-side JavaScript
- Loading skeletons
- Graceful error handling
- Good Core Web Vitals

Set measurable performance targets and test the deployed application.

Do not claim a performance score without running the relevant tests.

# 19. ANALYTICS AND CONVERSION TRACKING

Implement consent-aware analytics integration where appropriate.

Track useful events:
- Product viewed
- Search performed
- Category viewed
- Add to cart
- Remove from cart
- Begin checkout
- Purchase completed after verified payment
- Coupon applied
- Wishlist updated
- Custom order initiated
- WhatsApp handoff clicked
- Custom request submitted
- Blog article viewed

Do not send payment secrets or unnecessary personal information to analytics providers.

Support Google Search Console and a suitable analytics provider through configuration.

Provide a dashboard for basic store performance metrics when the necessary data is available.

# 20. SECURITY AND PRIVACY

Implement:
- Server-side input validation
- Output escaping
- Protected API routes
- Rate limiting where appropriate
- Secure session handling
- Supabase RLS
- File type and size validation
- Secure webhook verification
- Payment signature verification
- Idempotent payment processing
- Server-side coupon validation
- Server-side price calculations
- Appropriate personal data retention
- Privacy policy
- Safe error messages
- Audit logging for important administrative actions

Never expose:
- Supabase service-role keys
- Payment secrets
- AI provider secrets
- Webhook secrets
- Private customer data

Use environment variables for secrets.

Never store card data directly.

Protect against unauthorized changes to products, prices, orders, and administrative settings.

# 21. ERROR HANDLING AND INTEGRATION FALLBACKS

The application must continue to work safely when an external integration is unavailable.

Examples:
- If AI is unavailable, allow manual blog editing.
- If WhatsApp automation is unavailable, provide click-to-chat.
- If payment processing fails, retain the order's appropriate pending or failed state.
- If image upload fails, show a clear error.
- If scheduled blog generation fails, log the error and retry safely.
- If product recommendations fail, display normal related products.
- If a coupon is invalid, explain the issue without applying the discount.

Never display fake success messages.

Clearly document which integrations are active, which need credentials, and which are using fallback behavior.

# 22. TESTING

Test the application before declaring it complete.

Include:
- Unit tests for pricing and coupon calculations
- Product variant tests
- Cart tests
- Checkout validation
- Payment signature verification
- Duplicate webhook handling
- Admin authorization tests
- Supabase RLS tests
- Image upload tests
- Homepage builder tests
- Blog approval workflow tests
- Scheduled job authentication tests
- WhatsApp fallback tests
- Metadata and sitemap checks
- Mobile layout tests
- Accessibility checks
- Critical end-to-end customer journeys

Use an appropriate testing stack such as Vitest and Playwright where practical.

Do not claim that a test passed unless it was actually executed.

# 23. PROJECT STRUCTURE AND DOCUMENTATION

Organize the codebase into maintainable modules for:
- App routes
- Public storefront
- Admin dashboard
- Shared components
- UI primitives
- Database access
- Authentication
- Authorization
- Validation
- Business logic
- Integrations
- API routes
- Scheduled jobs
- Tests
- Database migrations

Provide:
- Complete source code
- Supabase schema and migrations
- Example environment file
- Seed data
- README
- Windows development instructions
- GitHub setup
- Vercel deployment instructions
- Admin bootstrap instructions
- WhatsApp integration guide
- Payment setup guide
- AI provider setup guide
- Scheduled automation setup
- Testing instructions
- Production checklist

Use real database-backed operations and working buttons. Do not substitute static mock data for actual functionality in completed modules.

Development seed data must be clearly separated from production data.

# 24. IMPLEMENTATION PHASES

Build the application in these phases.

PHASE 1 — FOUNDATION
- Inspect the repository.
- Initialize Next.js and TypeScript if needed.
- Configure Tailwind and shadcn/ui.
- Establish the Rooh Vastr design system.
- Configure environment variables.
- Connect Supabase.
- Design database schema and migrations.
- Build the responsive header, footer, and homepage.
- Establish the reusable component system.

PHASE 2 — STORE AND ADMIN
- Authentication
- Secure admin access
- Category management
- Product management
- Image uploads
- Homepage builder
- Promotional banners
- Content settings

PHASE 3 — SHOPPING
- Product listing
- Product details
- Search and filters
- Wishlist
- Cart
- Guest checkout
- Orders
- Payment integration
- Coupon validation
- Order tracking

PHASE 4 — CUSTOM PRINTING
- Custom printing service pages
- WhatsApp handoff
- Guided custom-order workflow
- Custom-order records
- Manual preview upload
- Approval and quotation tracking

PHASE 5 — SEO AND BLOGS
- Blog management
- SEO metadata
- Structured data
- Sitemap
- robots.txt
- Internal linking
- AI blog drafts
- Approval workflow
- Scheduled generation

PHASE 6 — INTELLIGENCE AND CONVERSION
- AI Gift Finder
- Related product recommendations
- Recently viewed products
- Exit-intent offers
- Analytics
- Abandoned-cart tracking
- Appropriate recovery messaging

PHASE 7 — PRODUCTION READINESS
- Security review
- RLS verification
- Payment testing
- Performance optimization
- Mobile testing
- Accessibility testing
- SEO validation
- Deployment and smoke tests

# 25. FINAL ACCEPTANCE CRITERIA

The project is complete only when:

1. The application uses Next.js, TypeScript, Supabase, GitHub, and Vercel without PHP.
2. The Rooh Vastr brand identity is implemented consistently.
3. The public website is responsive and functional.
4. Product and category data can be managed from the admin dashboard.
5. Homepage sections and promotional banners are configurable.
6. Ready-made purchases and custom-printing requests have separate workflows.
7. Custom orders can be managed from the admin dashboard.
8. Manual preview upload and customer approval are supported.
9. Cart and checkout calculations are validated server-side.
10. Payments are verified before being marked successful.
11. Coupons expire and enforce eligibility on the server.
12. AI blog generation creates drafts and requires administrator approval.
13. Technical SEO and structured data are implemented correctly.
14. Database security and administrative authorization are tested.
15. The project deploys successfully to the configured Vercel project.
16. External integrations have documented setup requirements.
17. Critical flows have been tested and their results reported honestly.
18. No completed feature is represented by a nonfunctional placeholder.

# FINAL INSTRUCTION

Begin by inspecting the existing repository and identifying what is already implemented.

If the repository is empty, initialize the project.

First deliver:
1. Proposed architecture
2. Folder structure
3. Database schema
4. Environment variable list
5. Design system
6. Phase-by-phase implementation plan

Then implement Phase 1.

Do not generate the entire project as one unmaintainable code dump. Build complete, testable modules, keep the application runnable, and explain exactly how to run each phase.

Make sensible technical decisions without repeatedly asking unnecessary questions. Ask only when a missing business decision blocks a correct implementation.

The final product must be a genuine, maintainable e-commerce platform for ROOH VASTR, not merely a beautiful frontend demo.