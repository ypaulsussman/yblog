## Prototype to Product (Cohen, Alan)

- Fundamental Principle: surprises only get more expensive if discovered later. 
    - Putting it another way: product development is largely an exercise in uncovering surprises as soon as possible.
    - Surprises usually lead to change; and change is always easier at the beginning of the development cycle than it is later on.

- An obvious decision that delays unearthing surprises (and making appropriate changes) is holding off on serious testing until after prototypes are largely developed. By serious testing, I mean the higher-level testing that 
    - looks at how usable the product is for our customers (sometimes called product validation), and 
    - at how the hardware, software, and mechanical subsystems work together, often called integration test and system test.

- There are two common deadly sins that fall under the vice of assumption: 
    - Assuming that we know what users want 
    - Assuming that users know what they want 

- First Law of Market Research: “If you ask consumers what they want, you’ll get an answer. That answer might be right or it might be wrong, and you’d better find that out!”
- Ways to improve the quality of information that we get from prospective users: 
    - People are generally much better at describing past behavior than in predicting future behavior, so we can ask them about experiences with other products: What features did they end up liking and using? What were the problems?
    - Even better than asking about past behavior, we can observe users in the actual environment they’ll use the product in to get a feel for what’s really going on. 
    - Even better, we can make device models and screen mockups for users to try in their usual environment (or a close replica), and get feedback from the process.


- There are three deadly sins that fall under fuzziness: 
    - Not having detailed requirements 
    - Not having a detailed project plan 
    - Not knowing who’s responsible for accomplishing what during development

- the natural inclination to add cool new features as a project progresses. Obviously, this behavior directly violates the Fundamental Principle of Product Development,
    - “Hey! Wouldn’t it be cool if the product had [fill in cool feature here]?” is probably the most critical—and most dangerous—exclamation in product development. Whether it’s a positive or a negative is determined by how and when it’s spoken. At the very beginning of a product development effort, during requirements definition, “Wouldn’t it be cool if...” is our best friend.
    - Steve Jobs had a great quote that applies: “People think focus means saying yes to the thing you’ve got to focus on. But that’s not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I’m actually as proud of the things we haven’t done as the things I have done. Innovation is saying no to 1,000 things.”

- But even a carefully crafted detailed project plan will be wrong, and it will be optimistic, and this should be accommodated realistically. We must plan to fail.
    - padding a project plan and budget is often easier said than done, particularly when presenting estimates to inexperienced managers: “You want to add 25% for I-don’t-know-what?” 
    - In these instances, it’s good to have a list of significant project risks on hand to demonstrate why we should plan for the unknown.

- developing technology and developing products are different things
    - In particular, when developing products, developing technology is largely optional. We can choose to create technology for our product, or in many cases we can choose to integrate existing technologies.
    - If the product can be developed quicker/cheaper/better by integrating existing technology (and it usually can be), then that’s the way to go.

- The difference between successful and failed products is largely in knowing, at the project-wide level, what to do and when to it. Note that the importance of sequencing cannot be overstated.

- While the basic concepts of knowing in advance what needs to get done and smart sequencing to minimize risks apply in all cases, the specifics of implementing these might vary significantly, particularly for very small or very large projects.

---

- great idea for a product is the intersection of a cool idea and a need that wants to be fulfilled.

- generating cool ideas is not a problem. The trickier parts for most of us are: 
    - Finding a real problem that can be solved by our cool ideas 
    - Fine-tuning the idea to best solve the problem 
    
- Note that not all successful products start with a cool product idea, at least not an original cool product idea.

- So that we can be smart about how we spend our hours, our first job once we have a cool idea is to do a reality check on whether it’s something that we really want to pursue.

- In other words, “Is there a reasonable possibility that the return will be greater than the effort?”
    - What will our product do? 
    - What will it look like? 
    - How many people might want the product? 
    - How much might they pay for it? 
    - How much effort will be required to develop it? 
    - How much will it cost to manufacture and ship? 
    - What are some good ways to market and sell it? 
    - Have others tried to do this? 
    - Have they succeeded or failed? Why? 
    - Why is our idea or execution different/better? 
    - Who could participate in design, development, and perhaps also marketing and sales? 
    - What will they be looking for in return? 
    - Will we need external funding for this? 
    - What are the potential sources for any funding we need? 
    - What will they be looking for in return? 
    - What’s the likelihood that these sources would commit to funding this effort?

- ground rules are the objectives of the project stakeholders, and these should be worked out during this preliminary planning phase so that we know how to keep everyone happy.
    - not understanding what each party is willing to invest and what they expect in return is a leading cause of projects that end in failure and hard feelings.
    - before starting any project, it’s best to have a good understanding of what each stakeholder is looking to contribute and what they expect in return, and to set up some rules around how to move forward if those contributions need to change
- So given our first-order understanding of features, market, expenses, revenue, marketing, sales, and resources, does developing this product seem to make sense?
- Do the odds of success seem good, nonexistent, or somewhere in between? Does development seem like an adventure or a schlep? Can we keep stakeholders happy?

---

- In our preliminary planning phase, we did a basic sniff test: does the product have a reasonable chance of success? 
- In the detailed planning phase, we’re looking to sharpen that preliminary planning exercise dramatically in order to cross out the unknowns. The overarching goal here is to make the project reasonably predictable so that we’re confident of what we’re building, and of the time and cost needed to bring it to market.

- here’s what we’re looking to end up with: 
    - A fairly detailed definition of our product: how it will look and function. 
    - An in-depth plan of what needs to be done, when, and by whom. 

- From this information, we can understand: 
    - ​How much development will cost ​
    - ​How long development will take ​
    - ​The resources/expertise that we’ll need to have available 
    - Solid financial models of how much our product will cost to build and sell. 
    - An understanding of the major technical and business risks (i.e., what don’t we know that can burn us); even better, we’d like to minimize those risks before exiting this phase.

- difficult to do unless we have a pretty good idea of what we’re building, so at least a substantial piece of the product (particularly specifications/requirements and design) is performed during this phase.

- product design is the science and art of creating specifications for how users will interact with a product. 
    - It includes color, size, ergonomics, screens, workflows, and virtually everything needed to describe how our product presents itself to the world.
    - we create a boundary around what our product needs to achieve, removing one important category of unknowns
    - the design will likely live as: 
        - 3D models
        - 2D and 3D renderings on computer monitors that do have the right detail and colors.
        - Use-case diagrams in flowcharts for each task a user can accomplish
        - Mockups of software screens
        - requirements documents detailing anything important that the product must achieve.

- The other big class of unknowns at this stage is typically around the technology needed to turn our design into reality.
    - Technical risk reduction is all about turning big technology unknowns into smaller technology unknowns.
    - The best way to reduce risk related to a big unknown is to implement it, usually on a smaller scale, to demonstrate that it functions. The resulting design, often called a proof of concept

---

- At this point, based on all of our planning, we should now have a pretty good idea of: 
    - What our product will do 
    - What it will look like 
    - What effort will be needed to create it 
    - What it will cost to manufacture 
    - How we’ll market and sell it The potential return for our efforts

- If we decide to move forward, we now have blueprints for 
    - what to build (the product design) and 
    - how to proceed (the project plan).

- There are three areas of activity during development that warrant some discussion at this high level: prototyping, testing, and purchasing. 
- The first of these is obvious; the latter two are often overlooked when thinking about development so I’m breaking them out to give them a little attention.

- Prototyping
    - When describing prototypes, product developers often refer to them as works-like and/or looks-like prototypes.
        - Initial looks-like prototypes are usually created as part of a detailed product specification, described earlier.
        - The initial works-like electronics prototype is typically a precarious-looking breadboard of electronics parts and development kits,
    - Each works-like/looks-like prototype is tested and debugged, and results are fed back into an improved works-like/looks-like prototype.
    - This process is repeated until we have something we decide is ready to move into production.
- Testing: There are several broad categories of testing that are somewhat related in practice: 
    - Design verification 
        - Design verification testing (DVT), sometimes called engineering testing or bench testing, is the type of testing associated with the development phase.
        - DVT demonstrates that the product’s engineering design is correct (i.e., that it meets its requirements). DVT is usually extensive,
    - Certification test 
        - Certification testing usually involves handing our finished (or nearly so) device (along with a purchase order) to an impartial test organization that will test against the appropriate regulations and standards for safety and performance.
    - Design validation 
        - The phrase design validation testing is sometimes used for testing that demonstrates that a product’s design (look, feel, usability, etc.) is correct and that it meets its intended use in the marketplace. 
        - Typical validation testing includes exercises like giving prototypes or finished units to prospective users to see if they can use the product to accomplish the tasks they’re intended to perform. Validation is normally done at various points during the product development cycle.
    - Manufacturing test
        - Finally, manufacturing testing  assumes that the engineering design is correct, but checks to ensure that each device is manufactured properly. Testing is performed at one or more points during the manufacturing process to help ensure that we don’t ship a defective product.
- Purchasing 
    - purchasing for prototypes requires more care than might be obvious,
    - The prototype parts we use should also be acceptable for production, which requires diligence and research. When we order parts for our first production build, we don’t want to hear that the nice LCD display used for our prototypes is no longer available;
    - Many parts have significant lead times, sometimes months between order placed and arrival, particularly for custom or semi-custom parts. So it’s often necessary to order long-lead-time parts as soon as we’re reasonably sure that they’ll be used rather than waiting until development is complete.

---

- Factory New Product Introduction (NPI)  is the process of creating and proving processes to ensure that our wonderful final prototype, which was lovingly hand-built and tested by skilled technologists, will be reliably reproduced in the factory at high volumes and reasonable cost, by machines and workers with moderate training, and often halfway around the world.

- The first manufacturing build of a product is often referred to as the pilot build.

- But pilot build is different from other builds in that it’s done

- evaluate the quality of the production process, and the quality of the product it produces.

- The production process is closely examined to look for inefficiencies and the potential to produce nonconforming products

- The first products off the line are inspected with meticulous care.

- This process is often called first article inspection.

- Also, certain types of testing are better performed on production units rather than on prototypes; the two common ones being reliability and certification testing.

---

- this wish list is oriented toward usage rather than technology. Lists of high-level wants like these are sometimes called marketing requirements, because they ultimately encompass the claims that marketing folks will make, claims that can be understood by typical users.

- Later on, we’ll create another layer of technical requirements that get more specific about how these goals translate into unambiguous specifications, so that we all understand exactly what’s meant by “small enough that I can comfortably put one in my wallet” (which might translate to “no longer or wider than a standard credit card and no thicker than 4 mm”).

- The best way to do a quick check on the need for a product and the size of its market is to review the performance of existing products with similarities, since it will give us a feel for how many people have proven that they’ll spend money on something like what we’re selling and how much they’ve actually been willing to spend.

- Even though we normally like to think of our product idea as revolutionary, almost all new products are broadly similar to existing products.

- The next question we should ask is whether, compared to competing products, our product has unique selling points (USPs) and key selling points (KSPs) that will make our product attractive to a substantial group of people.

- informal research can be tricky because people’s real behaviors might be different than the answers they give.

- it’s best to look for emphatic answers, such as “I’d buy that in a second. Let me know when it’s on the market!” rather than “I’d probably buy that.”

- Crowdfunding sites such as Kickstarter and Indiegogo are another way to perform low-cost market research.

- But crowdfunding isn’t a panacea; it also has important limitations. First, product development needs to be well along for a crowdfunding initiative to be successful.

- Another issue with crowdsourcing is that it tests a specific way to sell a product to a specific group of people. Crowdfunding participants are early-adopter types that trend toward young adults, male, childless folks with higher-than-average incomes. This audience is perfect for cool gizmo types of products, but probably not as useful for selling, say, hearing aids.

---

- The cost to manufacture each copy of our product, technically known as the unit cost of goods sold, or COGS (pronounced like cogs on a gear), is a make-or-break calculation: obviously, the cost must be well below our selling price. Fortunately, COGS tends to be reasonably predictable compared to the other numbers that we’ll estimate at this early stage,

- COGS includes just the direct cost to manufacture one unit, and does not include indirect costs such as R&D, salaries for management, sales and marketing, and so forth.

- The standard name for a list of parts like this is the bill of materials, or BOM (pronounced like “bomb”).

- COGS is fundamentally the cost of components plus the price we pay for assembly. Of these two, components are usually the larger cost, particularly for higher volumes and more complex devices.

- For a product like this that’s just a PCBA and a simple enclosure, I’ve found it reasonable and conservative to estimate the total cost of assembly (PCB assembly plus final assembly) as roughly the same as the BOM cost. In other words, doubling the BOM cost gives us the total COGS,

- The percentage difference between a product’s selling price and its COGS is known as its gross margin. Gross margin represents the money from which we’ll need to cover all of our expenses other than COGS,

- products within an industry tend to have similar gross margins. But gross margins between different industries vary quite a bit,

- gross margins on software tend to be high—usually 75% to 100%—because the cost of the materials sold is so low (often just a software download or

- gross margins at gas stations are way down in the 10% range. Why is a gas station at 10% and not, say, 20%? The reason is that the gas station doesn’t need to do very much work (or spend very much money) in order to deliver gas from their storage tank to your car. Almost all of their expense is in buying the gasoline for resale (COGS).

- For consumer electronics, gross margins tend to be in the 30%–50% range. For example, in 2012, Apple Computer’s gross margin across the company was 44%.

- Retailers purchase product at a discount, typically 15% to 33% off the selling price.

---

- Our next step is to do a quick check on the feasibility of developing our product:

- Fundamentally, development (and research) are long-term investments. We spend time and money to create a product in the hope that we’ll eventually earn enough to recoup the investment and earn some profit above that.

- for now, it’s useful to look at one question in particular: does our device require any technologies that we’re not likely to be able to develop, buy, or otherwise obtain? This unobtainable content is sometimes called unobtanium,

- Unobtanium tends to hide in the parts of a project that contain unknowns and risks. Thus, a useful way to identify a lurking need for unobtanium is to list each of the significant technical unknowns and risks in a project, and the reasons we should or shouldn’t worry too much about them.

- Now that we’ve taken a first look and determined that our product has a chance of being a success, it’s time to do some “real development”!

- The general flow of this first development phase is as follows: 
    - Definition. Characterize the product in detail from the perspective of the outside world. What will it do? What will it look like? These will end up as requirements that guide designers in developing an attractive and useful enclosure, and guide developers in creating the stuff inside the enclosure (electronics and software) that brings it to life. 
    - Risk reduction. Identify and reduce key project risks; e.g., anything that we’re not pretty certain we can do, or we’re not certain of the effort required to do it. 
    - Estimate cost of goods sold (COGS). Create a sound estimate of the cost to manufacture our product. 
    - Estimate development effort. Comprehensively plan the product’s development. What are the tasks that we anticipate? How long will they take, and how much will they cost? What are the interrelations; e.g., which tasks can’t be started or completed until certain others are completed first? This will result in schedules and budgets that can help us decide whether the project is feasible, and will set expectations for stakeholders.

- An important distinction between software and hardware is that while software iterations can take as little as a few moments, each hardware iteration can cost tens of thousands or even millions of dollars and require weeks or even months for fabrication and test.

- As a consequence, engineers who develop hardware tend to be fairly paranoid and careful during development, lest one goofy little problem slip through before fabrication and cause another expensive and long iteration cycle. Software folks tend to be much looser during development because software problems can usually be fixed relatively easily if caught later on.

---

- before expending too much effort in creating a smart product’s physical look, we should do some thinking about the details of our product’s function. Function, in turn, should flow from how our product will be used.

- most helpful to use tools taken from the software and industrial design worlds, starting with high-level user stories and then progressing to more detailed use cases and/or use case diagrams.

- User stories are bits of prose that describe something a person will do that involves the product, such as: 
    - The user will be notified that the MicroPed battery is low so she will know to change it. 
    - The user will associate their MicroPed(s) with a database so he can accumulate data for analysis. 
    - The factory technician will test the MicroPed before shipment to ensure that it is functioning properly. 
    
- Each user story calls out a high-level activity, including the person who will perform the activity (user, technician, analyst, etc.) and the reason(s) that they are doing it. By accumulating a solid list of these scenarios, we’ll create a good picture of the high-level needs our product must fulfill,

- It’s tempting to add detail, but there are a couple of good reasons to hold off. First, adding detail begins to put us into design/development territory.

- If we begin to specify these in more detail, such as “The user will be notified by a popup box that the MicroPed battery is low so she will know to change it,” we’ll be making design decisions early which are better left until we have the totality of the user stories and can address the totality of needs.

---

- Once we’ve compiled the high-level set of interactions that will occur between various people and the product, we can write use cases that flesh out our user stories.

- For example, the “the user will associate their MicroPed(s) with a database so he can accumulate data for analysis” story might convert to a use case that begins like this: “The user will be presented with a screen that lists the MicroPed devices that can currently be found by his phone (i.e., are within RF comm range), and will ask the user to tap the MicroPed that’s to be associated, once per second. The MicroPed that’s being tapped will identify itself by RF to the phone, and the user’s screen will indicate the selected device. The user will either confirm the selection, request a rescan, or cancel the operation. If the selection is confirmed and the user is not known to be registered with a database, a registration screen will be presented. Otherwise...”

- we’re starting to make design decisions,

- our example use case is verbose and difficult to read, which is a common issue with use cases. For this reason, use-case diagrams are often used rather than use-case prose.

- There are a few things that I find useful but which aren’t standard practice: Blocks are marked to indicate which entity is performing the action. By maintaining this system across all flowcharts, it’s easy to glance at a diagram and pick out the actions for a given entity. Names of other screens are called out in a different color than other text, again to make them easy to find for a designer or developer cataloging all the actions a screen must perform, say before beginning construction. If we want to get a little fancy, most diagramming tools will allow us to make each screen name a hyperlink that will take us to another use-case diagram, wireframe sketch, or image of that screen.

- An architecture is a way to break down complex products into smaller, abstracted functional building blocks. These building blocks are at a level higher than individual components, but lower than a single block labeled “product,” and they make it easier to discuss and explain high-level functionality.

- Particularly in this phase, we should keep a sharp eye out for ways to simplify everything. The quickest and easiest (i.e., lowest-risk) path to market is usually the best bet.

- If the product catches on, then it’s relatively easy to reduce costs and make other tweaks later when we have money coming in from sales.

---

- the usefulness of capturing a list of all the significant technology and development risks that we think of, as we think of them, such as “Full year of life from a battery.” This is sometimes called a risk register.

- we used our risk register to determine if anything looked serious enough to stop us from proceeding with product development. In this phase, we’ll look to reduce these risks to a level where we feel they won’t come back to seriously surprise us later in development.

- technical risk reduction is accomplished in several ways: 
    - Buying our way out; i.e., identifying already existing hardware and/or software that does what we want and which we can obtain at a tolerable price. 
    - Developing our way out; i.e., developing technology as experiments designed to increase our confidence that at-risk items can be accomplished within tolerable (and reasonably predictable) time frames and costs. 
    - Redefining the product to avoid the risk altogether.

---

- we created a rough, preliminary COGS estimate to see if we had a good chance of selling our product at a profit. Now it’s time to update and refine that estimate to see if we still look to be profitable.

- getting quotes is only part of the process. We’re also looking for feedback that can help to refine our detailed development efforts. To this end, it’s best to approach vendors as collaborators. Our vendors will typically have deep experience at doing what they do and tapping their knowledge can be a gold mine. Rather than asking “How much will it cost for x?”, it’s better to ask this as “We’re thinking of x. Can you help us understand if this is a good way to get what we want and how we can best work together to make this happen, and then give us a quote?”

--- 
- detailed development is an exercise in iteration.

- The bulk of the day-to-day work in this phase is in designers/developers

- What tends to separate success from failure here is less in the technical abilities of each participant (although this is not an insignificant factor), and more in having a process that ensures that everyone’s efforts tie together into a coherent whole.

- While verification tests that the product’s internal (company-generated) requirements are met, validation is higher-level testing that determines whether the product meets customer needs. 
    - A common saying is that “verification tests whether we designed the product correctly, and validation tests whether we designed the correct product.” 
    - Validation is much more of an open-ended exercise than verification, but it typically involves having prospective users work with a product to see if they can accomplish the goals that we intended. 
    - Also, formal validation is much less common than formal verification.

---

- Low-end processors tend to be packaged as microcontrollers, while higher-end processors tend to be packaged as microprocessors.
    - Microprocessors tend to include only the individual processing units (CPUs), while microcontrollers include the CPU and other components needed for operation, such as memory, timers, counters, clocks, and various interfaces. 
    - Microprocessors are more flexible (and usually more powerful), but they require more support circuitry and greater design effort. Microcontrollers normally require less design work and have lower associated costs for development and in production.

- RTOSes (real-time operating systems) are lightweight OSes whose roots lie in ensuring that applications can respond to requests within a certain time period. 
    - However, RTOSes can be very useful even if the timing considerations aren’t important to us, as RTOSes typically have some of the other niceties of an OS (e.g., device drivers) that we can use “out of the box.” 
    - Most RTOSes are intended to be run on lower-powered processors in applications where memory is at a premium, so they tend to be lean and mean. 
    - The good news is that they are relatively small, taking as little as a few kilobytes of ROM/Flash and even less RAM. The flip side is that they are relatively spartan—even the most sophisticated RTOSes are stripped down compared to larger OSes. 
    - The namesake function of RTOSes is guaranteed response characteristics.
        - The traditional purpose of an RTOS is to provide predictability in two different areas: timing and reliability. For timing, an RTOS will provide some degree of assurance that it can respond to an event (such as a switch being pressed) within a certain amount of time, say, one millisecond. The generic term for an event in the RTOS world is an interrupt request (IRQ). We can set the timing bounds in software, but there are minimums depending on the RTOS and processor. One fundamental difference among RTOSes is whether real-time performance is truly guaranteed or only very likely. A hard RTOS guarantees that operations will occur within a certain time period, whereas a soft RTOS simply makes it very likely. Soft RTOS is a bit of a squishy term. For example, even desktop Windows and Linux qualify as RTOSes (and work fine in that capacity) if the should-not-exceed response time is long enough. But while Linux and Windows almost always respond within a few hundred milliseconds if set correctly, guaranteed response times for “real” RTOSes are typically in the microsecond range. For applications that need to be ultra-reliable, such as automobile braking systems, we obviously need an OS that’s fairly bulletproof—if the software crashes, the car might crash, too. Beyond timing guarantees, some RTOSes, such as Green Hills Integrity, SAFERTOS, QNX Neutrino, and ThreadX, provide various mechanisms to help assure us (and others, such as the FDA) that their operating system is highly reliable when used in our product. The mechanisms usually take the form of: The compiler and other tools being certified to one or more internationally recognized standards, such as IEC 61508

- Embedded Linux is Linux in as little as a few megabytes of memory. 
    - Depending on configuration, embedded Linux can boot in less than a second, although it’s best to count on several seconds for most applications.
    - Configuring Linux for embedded applications is a nontrivial task. A desktop Linux installation can be huge and complex because we have tons of processor power, RAM, and disk. We don’t really care if things aren’t perfectly optimized. In fact, since a single desktop box is used for so many purposes, it’s not even clear how it should be optimized. On the other hand, embedded Linux typically has a very specific task to accomplish with limited CPU, RAM, and Flash/ROM to draw upon, so we usually need to tightly optimize our installation (also called our image). We want the bits we need, and nothing more. Creating an adequate but minimal image including OS, libraries, and applications, along with the software tools to support build and debug (called the toolchain) turns out to be a nontrivial task.
    - we now have embedded Linux build systems that greatly ease this task. These build systems allow the user to select the support that they want in their Linux image and—poof!—an image and/or toolchain are built.
    - There are currently about a dozen such build systems in use today, but the industry seems to be moving towards Yocto,

- Fundamentally, Android is a package of parts that’s extremely optimized for a narrow set of use cases (smart phones and tablets). Even Linux itself has been optimized in a couple of fundamental ways. First, the standard GNU-licensed Linux C library glibc has been replaced with Bionic libc, which is much lighter in weight (as befits use in a small device), and which sports the more-corporate-friendly BSD license.

---

- No matter which regulations we must follow or where we need to follow them (e.g., which country), the basic interactions between product development and regulations are normally as follows: 
    - Identify all regulations that apply to our product. 
    - Add identified regulations to our product requirements to ensure that we develop our product to meet them. 
    - Test our completed product to ensure that requirements are met. 
    - Declare that our product meets requirements. 
    - Label our product correctly. 
    - Sell our product. 
    - Alert the proper authorities if our product falls short on safety when it’s marketed, and work to correct the problem.

- Regulations are developed and enforced by government agencies such as the Consumer Product Safety Commission (CPSC), the Food and Drug Administration (FDA), and others. 
    - In the US, all regulations are conveniently found in one place: the Code of Federal Regulations (CFR). 
    - The CFR is broken into Titles, each addressing a different area. 
    - Titles are further segmented into chapters, subchapters, parts, and sections.
    - Title 16, Commercial Practices, is one that’s of interest to product developers: it covers the regulations enforced by the CPSC. 
    - Multiple titles often apply to a single product. 
        - For example, if a consumer product contains electronics, then it must comply with Title 16, Commercial Practices, as well as the FCC’s regulations that are found in Title 47, Telecommunication, and perhaps other Titles depending on its function. 

- Standards are rules (of sorts), normally created by non-government committees under the auspices of standards organizations such as... 
    - the International Electrotechnical Commission (IEC), the American National Standards Institute (ANSI), the International Organization for Standardization (ISO), Underwriters Laboratories (UL), ASTM (formerly known as the American Society for Testing and Materials) and others. 
    - Multiple standards organizations sometimes share a single standard, such as ANSI/IEC 60529 Degrees of Protection Provided by Enclosures. On their own, standards don’t carry the force of law unless laws or regulations are created that mandate their use, which often happens.

- In fact, regulations and standards are very similar, and it’s often the case that regulations simply point to standards. In other words, we can or must meet a standard in order to comply with a regulation. 
    - For example, CPSC regulations state that all cribs sold in the US must meet ASTM standards F406 and F1169. 
    - In the US and the EU, electrical medical devices aren’t strictly obliged to meet the aforementioned IEC 60601-1, but all electrical medical devices do need to somehow demonstrate that they’re safe and demonstrating conformance to 60601-1 is called out by the regulations as one way to do this. (And as a practical matter, every electrical medical device that I know of conforms to 60601-1; devising an alternative plan to demonstrate safety is a huge task, and very risky as it might not be acceptable to the relevant agencies.)

- Many products require testing by an impartial third party to certify that they meet relevant regulations. There are a variety of companies that provide certification services. Some of the better-known ones include Underwriters Laboratories (UL), Bureau Veritas, Intertek, the TÜVs (there are four of them), and CSA. All major providers are international, which is important if we need to certify to regulations in more than one country. Some providers are not-for-profit (e.g., UL, CSA), and some are for-profits (e.g., Intertek, Bureau Veritas).

- Most products that contain electronics are regulated by two agencies: the CPSC and the FCC. Any product that contains electronics comes under FCC jurisdiction. Some “consumer” products, like automobiles, medical products, cosmetics, tobacco, and firearms, are regulated by agencies other than CPSC, but unless our product is obviously not for “typical” consumers (e.g., we’re developing a medical device or a jetpack), it’s best to start with the assumption that the CPSC has jurisdiction over us. CPSC
    - Whether or not we intend for our product to broadcast over the radio spectrum, all electronic products must comply with the FCC’s regulations in 47 CFR Part 15, Radio Frequency Devices. 
    - Radio Frequency (RF) communication is like shouting across a room to talk to a friend—our friend will hear us, but so will others in the room. If we shout loud enough, those others won’t be able to hear their own (separate) conversations. 
    - One of the FCC’s jobs is to play traffic cop to radio conversations, making sure that nobody shouts too loud and drowns out other conversations. This job is covered in the Part 15 regulations. 
    - It turns out that regulating RF in a way that makes everyone happy is pretty complex. Different types of communications have very different needs. 
        - For example, while FM radio stations need to shout really loud in order to reach a large audience, 
        - WiFi needs to talk in hushed tones so each wireless network doesn’t interfere with neighbors down the street. 
        - So FM radio and WiFi are given different parts of the radio spectrum to use (i.e., different frequency bands) so as to not interrupt one another; otherwise, FM radio would drown out WiFi. 
        - And WiFi is only permitted to transmit at low power to avoid drowning out other WiFi networks in the neighborhood.
    - we might not intentionally radiate RF, but it turns out that all circuits emit RF whether we want them to or not—it’s a matter of physics. And some circuits, notably those that involve DC motors or that switch high currents, can unintentionally spew a lot of RF. For this reason, all electronic devices must be tested and certified as unintentional radiators to make sure they’re not emitting more RF than the FCC allows.
    - Even intentional RF radiators need to undergo unintentional radiator testing and certification to make sure they behave properly in the frequency bands they’re not using for communications.

- The degree to which a product (or service) fulfills its requirements is an objective measure of quality. 
    - Quality management systems (QMSs) are policies, processes, and procedures—essentially “recipes”—that businesses (and other organizations) develop and follow to ensure that their products and services meet customer expectations
    - there are internationally recognized quality management standards that QMSs can adhere to, ISO 9001 being the best-known and most popular; more than one million organizations worldwide currently have QMSs that are certified to conform to this standard. As a point of clarification, ISO 9001 is a quality management standard, not a quality management system.
    - ISO 9001 simply lays out a general framework that quality systems can conform to—general enough that it can apply to virtually any business, from law firms to resistor manufacturers to food makers.

---

- Requirements are all about setting common expectations for stakeholders.
    - In principle, anyone can look at the requirements long before a product is built and see the critical things the product will do, as well as get some information on characteristics like size, weight, and reliability. This way, we know what we can tell prospective customers, investors, and others.
    - The folks developing the product can use it as a set of instructions that describe what they should build.

- One of the hallmarks of a good requirement is that it’s unambiguous. There should be no disagreement when the requirement is met. Another way to say that is that requirements should be testable.

- I like to break requirements into two types: 
    - Positive requirements, which address the key thing(s) our product does. These are the things we’d mention if given 15 seconds to describe our product. For example, a positive requirement for a pedometer might be “the product will create challenges to motivate the user.” 
    - Lurking requirements, which address all the background stuff that isn’t central to our product’s mission but will cause trouble if we don’t address it properly. Examples include size, weight, battery life, regulatory requirements, reliability, and so forth.
    - Below is a checklist of categories of lurking requirements that can be useful to review at the start of a project: 
        - Countries we’ll be selling our product in. 
        - Inclusion of manuals, labeling, etc. 
        - Languages for applications, manuals, labeling, etc.
        - Regulatory requirements. These typically include safety and electromagnetic compatibility. 
        - Reliability. This is typically expressed as a mean time between failures (MBTF) or other measure. In practice, determining and/or estimating reliability prior to selling units is a nontrivial exercise. 
        - Availability of parts. For example, all parts are expected to be available for five years after manufacturing begins.
        - Brightness, loudness, etc. How bright should LCD screens be? How loud should speakers and alarms be? 
        - Environmental conditions during use. Max/min temperature, humidity, altitude, drop height, shock resistance, airplane or other travel modes (silent), airport security scanners. 
        - Environmental conditions during shipping/storage. Again, max/min temperature, humidity, altitude. 
        - Size/weight/color. Any special requirements not covered in positive requirements. 
        - Resistance to water and/or dust. These are typically expressed using the standard ingress protection (IP) rating. For example, a liquid ingress IP rating of 4 means that our product resists splashing water. A list of IP ratings and associated tests to demonstrate that we meet a given rating can be easily found on the Web (showers, swimming, rainstorms, laundry). 
        - Usability. Define the users, and some measure of usability. For example “90% of a random sample of Registered Nurses shall be able to successfully complete all of the following tasks, unaided, after reading the manual.” Include considerations for users that have disabilities (vision, hearing, etc.) as appropriate. 
        - Cost of goods sold (COGS). What’s the maximum manufactured price at which we can make a buck? 
        - License restrictions around IP created elsewhere. For example, the need for any software used to be licensable in a way that does not require the release of modified source code. 
        - Licensing of the device/software and upgrades. Per-use, per-user, or other licensing requirements that might need to be enforced by the device software/hardware. 
        - Security. Personal data, financial data, password storage, protecting the designs and code in the product from reverse engineering 
        - Power requirements. 120V AC? 240V AC? Car plug? Etc. 
        - Hardware/software platform: if our product requires the use of other systems, such as when it includes installable software, we should specify (as possible) the hardware and software that we’ll support. Examples are operating systems including versions and patch levels, web browser types and versions, minimum memory and processor requirements for computers, interfaces including revisions (e.g., USB 2.0), smart phone versions, etc. 
        - Support. Examples might include the need for logs of errors that occur and ways to transmit that information to service personnel. 
        - Responsiveness. How quickly should the system respond to events, such as a user selecting an option on a screen? How long from turn on until the device is ready for use? Will there be a splash screen or lights to let the user know something’s happening? 
        - Serviceability. Can the device be serviced if something fails, or should it be replaced? If serviceable, which parts should be serviceable? Does it need periodic maintenance? 
        - Real-time clock issues. For any device with an internal clock that keeps track of date and time, a number of issues come up. How long should the clock run off its battery? Is the battery rechargeable or replaceable? How will the clock be set (user or Internet Network Time Protocol)? Should the device store local time or GMT/Zulu time? How much clock drift is acceptable (e.g., one minute per year)? 
        - Manuals. Should the product need a manual? If so, should it be printed and/or on the Web? 
        - Disposal. Should the device be disposed of as normal trash? Or can there be special requirements? 
        - Packaging. Will the packaging be fancy or functional? What kind of shipping stresses should it protect against?

- We can also add other bits of information to each requirement that will help us down the line: 
    - Feature Importance
    - Rationale: Why do we have this requirement? This will push us to make thoughtful requirements, and can also help readers to understand requirements that can seem odd. 
    - Test Method: A brief description of how we will test that the requirement is met. This pushes us to write only testable requirements and to start thinking about what will be needed for the test process.
    - It’s also useful to add an owner to each requirement who is a person or department that’s responsible for that requirement being met.

- What can work well is a process along the following lines: 
    - Start by holding one or more a cross-functional meetings with representatives of all major stakeholders (e.g., Engineering, Design, Marketing, Sales, Corporate, Regulatory, Finance, etc.) to flesh out the major positive requirements. Some groups might only need representatives present at a subset of meetings. For example, Finance might only attend the kickoff meeting to give guidance on what’s feasible from their point of view. 
    - Write up the positive requirements that were agreed upon at the meeting, and meet again to review and refine. 
    - Have each stakeholder group individually identify each type of lurking requirement that falls under their area of responsibility, and suggest those requirements or create a plan to determine those requirements. For example, Regulatory might be able to write their requirements without doing research because they’ve been involved with similar products. But Design might write a plan to do some studies to understand how the product will be used before writing requirements on size, weight, etc.
    - Have a cross-functional meeting with representatives of all major stakeholders to review and finalize (for now) the positive and lurking requirements.

- Most requirements aren’t set in stone; they should be updated regularly as we have new information. The update process should ensure that: 
    - All relevant stakeholders have input. 
    - All relevant stakeholders are notified of changes so they can adjust to the changes.
    - We consider the effect of any change on other requirements.
    - We consider the effect of any requirements change on any tests that validate that the requirement was met.

- always helps to better understand our projects, including: 
    - Cost and timeline 
    - Skills needed. For example, who should we hire/assign? 
    - Dependencies: when do we need what? For example, we don’t want to have to wait weeks to test a prototype because we didn’t think to order a specialized piece of equipment until it came time to begin testing.
