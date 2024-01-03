---
items:
  - type: articles
    body: >-
      In [my previous article](/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web), I showed how you can interact with ChatGPT through Voice UI on the web. If you haven’t already, read that article first to know what I built. What sells the illusion of having a real-time conversation with the AI is the low latency. Because the response is so quick, it doesn’t feel like the AI needs to process your information and create an audio file to playback to you. Even though this part feels realistic, the robotic voice for the speech synthesis doesn’t. My colleague [Christofer Falkman](https://www.linkedin.com/in/christoferfalkman/) pointed me to a way I could make Aiva, the ChatGPT-powered assistant, even more realistic. Using [ElevenLabs](https://elevenlabs.io/)’s AI-powered speech synthesis I can replace this robotic voice with an incredibly realistic voice. Time to upgrade Aiva!

      ## Let’s implement it

      As you might remember from the previous article, Aiva works like this:

      ![Schema showing the turn based conversation flow of Aiva](/img/articles/reducing-latency-in-ai-speech-synthesis-old-aiva-interaction-schematic.png)

      Instead of using the native SpeechSynthesis Web API, we now replace it with a call to the ElevenLabs API where we get returned binary data in the form of a buffer. Or, simplified, we get a bit of data we can play as audio. As soon as the entire piece of text is sent to that API, returned to the application, and played as audio, the user gets to talk again. This yields a pretty cool result with an incredibly realistic voice:

      ![Schema showing the turn based conversation flow of Aiva with sidestep to the ElevenLabs API](/img/articles/reducing-latency-in-ai-speech-synthesis-new-aiva-interaction-schematic.png)

      <div><iframe width="100%" style="aspect-ratio: 16/9" src="https://www.youtube.com/embed/y7rUfKh6PfE?si=juamdW07HQ2FCaF2&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>


      ## It’s slow!

      You might notice that the AI-powered speech synthesis is quite a bit slower. The latency increases with the length of the text. It first needs to turn all of the text into audio before it can play the first sentence. The longer the text, the slower the response. This is breaking the user experience of having a natural conversation.

      ### Low latency over realistic voice

      In my opinion, having a low-latency robotic voice in a real-time conversation is a better user experience. It doesn’t take you out of the conversation as much. So what now? Don’t use the AI version? Of course not, let’s fix this!

      ## Time to take some well-known approaches

      First, I looked into whether the audio could be streamed from the API. Unfortunately, I couldn’t find this option and didn’t want to limit my choice of which AI-power speech synthesis products I could use. Then, I thought about how, as a developer, I would normally handle large slow requests. Imagine you are making a dashboard with 10.000 rows of data. You could opt for pagination where you click a button to go to the next page of results. Chunking the data in pages of rows works great. Taking this into a conversation, we could chunk the text into sentences and play the audio for each sentence. Whilst this is the approach I took, this posed a new problem. Let’s imagine I retrieve audio for a sentence of the text, play the audio, and then do this over and over again for the entire piece of text. This means that the latency is pretty much just split up, but still present:

      ![Schema showing the conversation chunked into sentences in a serialized manner](/img/articles/reducing-latency-in-ai-speech-synthesis-ai-speech-synthesis-schematic-chunked.png)

      As you can see, there is quite a bit of time while the audio is playing which I could utilize to retrieve the audio data for the next sentence. This is pretty similar to how humans talk. You think of what to say and while you are talking you’re already thinking of the next sentence. This results in a fluent flow where there is always audio playing:

      ![Schema showing the conversation chunked into sentences in a synchronous manner](/img/articles/reducing-latency-in-ai-speech-synthesis-ai-speech-synthesis-schematic-chunked-optimised.png)

      ## The end result

      That did the trick! The latency is now low enough to not intrude on the natural flow of the conversation:

      <div><iframe width="100%" style="aspect-ratio: 16/9" src="https://www.youtube.com/embed/zYguVD2_DSg?si=bWePsGv70thn3CJs&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

    date: 2023-11-16T00:00:00.000Z
    slug: reducing-latency-in-ai-speech-synthesis
    tags:
      - front-end
    intro: >-
      AI-powered speech synthesis is getting incredibly realistic. This opens up many possibilities to generate realistic audio based on the text you provide. Whilst relatively fast, the latency still isn’t low enough for “real-time synthesis”. Let’s optimise that!
    teaserCopy: >-
      AI-powered speech synthesis is getting incredibly realistic. This opens up many possibilities to generate realistic audio based on the text you provide. Whilst relatively fast, the latency still isn’t low enough for “real-time synthesis”. Let’s optimise that!
    teaserImage: /img/articles/reducing-latency-in-ai-speech-synthesis-aiva.png
    title: >-
      Reducing latency in AI Speech Synthesis
  - type: articles
    body: >-
      I probably don’t have to tell you what an enormous impact the rise of AI has had on the industry in recent times. It’s amazing to see all the progress that is being made. I knew when I was looking at an upcoming two-day hackathon at iO, I just needed to build something cool with ChatGPT. More particularly, the way you interact with ChatGPT.

      ## Why create a different way to interact with ChatGPT

      Personally, I don’t develop AI. I do however interact with it a lot. Like most of you reading, I interact the most with ChatGPT. While the chat interface is great to use while working, It always felt slightly awkward to interact with. When given the choice, I will always rather walk over to someone (or have a call) than use chat to discuss something. It feels a bit more natural as it is the way of communicating that is powered by our natural hardware: speaking and listening. So, if ChatGPT requires me to input text and read outputted text, can’t I just do that by speaking and listening?


      I’ve wanted to build a demo application that enables just that. A user can start a conversation with ChatGPT and just talk. Once they’re done talking, ChatGPT processes the text and sends back a response. This response is then read out loud to the user after which the cycle continues.

      ![A schematic of the flow described above](/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-user-interaction-schematic.png)

      Being a developer for the web, I naturally gravitated to the techniques I would use there. As it turned out in the end, this gave a surprising advantage in the user experience. Here is a quick glimpse of the result called “Aiva”:

      <div>
      <iframe width="100%" style="aspectRatio: 16/9;" src="https://www.youtube.com/embed/z95qWSJoYGo?si=v0f4Mh_AEmN-yCjK&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>


      ## What techniques to use?

      For front-end frameworks, any will do. I’m most comfortable with React.js and Next.js so decided to use those. Also, I always want to try out at least one new thing when creating a demo. This time, that was the component library [Radix](https://www.radix-ui.com/) which focusses on important aspects as accessibility. Also, I can highly recommend using a component library when building demos so building a nice UI doesn’t take away from your time and focus on the thing you are actually trying to build.

      ### Input: SpeechRecognition Web API

      For the input, I used the [SpeechRecognition Web API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). Fun fact, I built an application over six years ago called [PresiParrot](https://presi-parrot.davebitter.com/) to automatically create captions when giving a presentation. What I find awesome about using web standards is that even after six years, the application still runs perfectly fine, perhaps even better, as it will always be supported by the browser.


      In essence, the SpeechRecognition Web API provides you with a way to use the user’s microphone to capture audio and once they’re done talking, provide you with a text string to use. You can even use interim, or live updated, results if needed.

      #### Why use this?

      A big upside for me is the before-mentioned benefit that you get with using a web standard. Another major benefit of using the Web API that is built into the browser is that it’s incredibly quick. This goes for the SpeechRecognition Web API (input) but especially for the SpeechSynthesis Web API (output) which we’ll look at in a bit. Your browser already ships with the logic and voices that you might need, mitigating the need for another service that takes time. This greatly benefits the performance which is always important. But as it turned out, it became a nice surprise while building the demo. Have you ever tried to talk with your Google/Apple/Amazon home device? Whenever you ask something, there is always a few seconds of delay. This takes you out of the illusion that you’re actually having a conversation. As this Web API is so quick and needs no loading time, it feels nearly instant helping to sell the conversation effect.

      #### How to use this?

      Using the SpeechRecognition Web API is fairly straightforward. You first see if the Web API is supported in the user’s browser:


      ```js

      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        // handle fallback
      }

      ```


      Next, as seen in the example above, the Web API can either named `SpeechRecognition` or `webkitSpeechRecognition`. We assign it like this and set it up:


      ```jsx

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      const recognition = new SpeechRecognition()
      recognition.interimResults = true
      recognition.lang = 'en-US'

      ```


      We change two settings, first we set `interimResults` to `true` so we can receive the interim results while the user is speaking. Next, we set the language the user is going to speak in. Naturally, you can provide UI to alter this, but for the demo english is fine.


      With everything configured, our next step is to create an `onresult` and `onend` callback:


      ```jsx

      recognition.onresult = (event) => {
        const { transcript } = event.results[0][0]
        // do something with transcript
      }


      recognition.onend = (event) => {
        const { transcript } = event.results[0][0]
        // do something with transcript
      }

      ```


      I've created this small demo so you can try it out yourself:

      <iframe src="https://codepen.io/davebitter/full/vYbMxNL" className="absolute inset-0" style="width: 100%; aspect-ratio: 16/9;"></iframe>

      <small>Source available on <a href="https://codepen.io/davebitter/pen/vYbMxNL">https://codepen.io/davebitter/pen/vYbMxNL</a></small>


      Now, for every interim result while the user is talking, you can do something with that transcript string once `onresult` is called. For instance, you show some live feedback on the screen with what text the Web API interpreted the user’s speech as. Once the user stops talking, the `onend` is called with the end result. Great! We now have turned speech into a text string to use as input!

      ### Output: SpeechSynthesis Web API

      What the SpeechRecognition Web API is for input, the [SpeechSynthesis Web API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) is for output. In it’s simplest form, the Web API allows your computer to read a text string out loud.

      #### Why use this?

      As mentioned before, this Web API comes with the browser already built-in! It’s not just the Web API itself, but also a wide range of voices to use. These voices can be from difference countries and even different accents.

      #### How to use this?

      Let’s make it read out a text string. First we check whether the user’s browser supports the Web API again and create a constant to use later on. Finally, we need to make a `SpeechSynthesisUtterance` which is basically a unit of text that the Web API needs to read out loud:


      ```jsx

      if (!('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window)) {
        // handle fallback
      }

      const synth = window.speechSynthesis


      const voices = synth.getVoices()

      const preferredVoice = voices.find((voice) => voice.voiceURI === 'Karen')


      const utterance = new SpeechSynthesisUtterance('Hello from the computer!')

      utterance.rate = 1

      utterance.pitch = 1


      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      ```


      I've created this small demo so you can try it out yourself:

      <iframe src="https://codepen.io/davebitter/full/QWYPpax" className="absolute inset-0" style="width: 100%; aspect-ratio: 16/9;"></iframe>

      <small>Source available on <a href="https://codepen.io/davebitter/pen/QWYPpax">https://codepen.io/davebitter/pen/QWYPpax</a></small>


      As you can see, I can retrieve a list of all the supported voices on the user’s browser. I like the one named `"Karen"` so decided to store that one if found. Naturally, you can create a dropdown with voices for the user to select the one they like.


      Next, we create a `SpeechSynthesisUtterance` with the text string to read out loud. We can then tweak the utterance a bit more by changing the rate (or speed) and the pitch of the voice. Finally, if our preferred voice is available, we assign it to the utterance as the voice to use.


      Now all that is left is to speak:


      ```jsx

      utterance.onend = () => {
        // do something once all the text has been spoken
      }

      window.speechSynthesis.speak(utterance)

      ```

      That’s it! We now have both input and output covered.

      ### Tying the two together

      I’ve created a `useSpeechRecognition` hook that exposes utilities to:

      * get the interim result to display in the UI

      * check whether there is permission to use the microphone to show UI whether it is available or not

      * request listening permission to the user

      * know whether the Web API is currently listening the the user

      * start listening to the user

      * stop listening to the user


      I’ve also created a `useSpeechSynthesis` hook that exposes a utility to speak to the user with a passed text string.

      Finally, I’ve created a `useConversation` hook that:

      * Keeps track of the conversation state

        * `"UNPERMITTED"` - there is no permission yet to listen to the user’s microphone ![calm visualisation of Aiva unpermitted](/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva-unpermitted.gif)

        * `"IDLING"` - the application is currently not listening or responding ![calm visualisation of Aiva idling](/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva-idling.gif)

        * `"LISTENING"` - the `useSpeechRecognition` hook is listening the to the user’s microphone ![more moving visualisation of Aiva listening](/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva-listening.gif)

        * `"RESPONDING"` - the `useSpeechSynthesis` hook is speaking to the user ![moving visualisation of Aiva unpermitted](/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva-responding.gif)

        * `"STOPPED"` the user stopped the application ![calm visualisation of Aiva stopped](/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva-stopped.gif)

      * Uses the utilities exposed by the `useSpeechRecognition` and `useSpeechSynthesis` hooks to create a turn-based
      conversation

      ![A schematic of the flow described above](/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva-interaction-schematic.png)

      #### ChatGPT integration

      So far, the application has yet to be hooked up to the ChatGPT API and is just responding with a fake answer. Let’s make the magic happen. All I need to do is create an API route in my Next.js application that receives two things in the form of a POST request:

      * `messages` - an array that consists of objects with a key of

        * `role` - who is the message from? The `"user"` or the `"assistant"`.

        * `content` - the text string

      * `aivaRole` - what is the role of the AI to give it a bit of context on what it should behave like

        * `"assistant"` - a general AI assistant that can virtually take up any role as long as the user instructs it to

        * `"tech-interviewer"` - behave like a tech interviewer so a developer can practice an interview

        * `"scrum-master"` - act like a scrum master and help a team with their scrum sessions

        * `"counselor"` - be a counselor to the user providing them with a listening ear or advice


      I added the `aivaRole` to give people using the demo an idea on what Aiva could be used for.


      The user sends over a list of the whole conversation for context for the AI as it needs this for every request. I prepend this list with a bit of context for the AI so it knows it runs in a Voice UI, how it should behave/respond and finally the role the user set the AI to. This request then goes to the ChatGPT API, returns a response, returns that response to the front-end to finally be consumed by the `useConversation` hook.

      ### React Three Fiber Visualisation

      So yes, much like [the OpenAI solution](https://openai.com/blog/chatgpt-can-now-see-hear-and-speak), you can now speak with the conversation. Besides mine feeling a bit more natural in the sense that it responds a lot quicker (~800ms), it still feels like you are talking with a ChatGPT API. We’ve stripped the need for traditional UI like inputs and text on the screen, but created a great new opportunity to give some personality to Aiva and simultaneously provide the needed feedback to the user (is it listening, responding etc.).

      #### Why use this?

      A few weeks back at the [Frontmania Conference](https://frontmania.com/), [Tim Beeren](https://twitter.com/tim_beeren) showed some amazing examples of [Three.js](https://threejs.org/) using [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction). Another opportunity to try out something I haven’t worked with before! React Three Fiber basically allows a simpeler integration for using Three.js in a React.js application. This was good for me as I was not only using React.js to render the application, but also have the state of the conversation there which I wanted the visualisation to respond to.

      #### How to use this?

      I quickly realised that creating an awesome interactive visualisation would take quite a bit knowledge on subjects like shaders. Due to my incredibly short timeframe of two days to build the entire application, I took an [existing visualisation](https://www.youtube.com/watch?v=6YJ-2MvDqhc) and made it interact with the state of the conversation. I had control over two parameters:

      * `speed` the speed of the movement of the blob

      * `intensity` the intensity of the spikes in the blob


      I could then create a little hook to change these values based on the conversation state:


      ```jsx

      useEffect(() => {
        switch (conversationState) {
          case 'RESPONDING':
            speed = 2
            intensity = 0.75
            break
          case 'LISTENING':
            speed = 1.25
            intensity = 0.35
            break
          case 'STOPPED':
          case 'IDLING':
            speed = 0.8
            intensity = 0.1
            break
          case 'UNPERMITTED':
          default:
            speed = 0.5
            intensity = 0.05
            break
        }
      }, [conversationState])

      ```


      ## The end result

      With all the parts connected, I now have an application that caters a turn-based conversation where the state of the conversation is visualised through an interactive data visualisation. All of that without the need of a single piece of text or required user interaction on the screen! To showcase how these conversation can go, I’ve recorded this short screencast:


      <div><iframe width="100%" style="aspectRatio: 16/9;" src="https://www.youtube.com/embed/dr-AfzgEcZQ?si=7w-Fshn5PGJYKKSS&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>


      ### What are some practical use cases?

      In this article I already highlighted a few use cases for demo purposes. The easy answer is that it can cater all use cases. If I boil down my application to its simplest form I created a nice input-output system for a conversation. Whatever the user wants to use it for they can tell the AI and it will, if appropriate, follow. A few more examples (which I naturally asked ChatGPT for):

      * **Customer Support**: ChatGPT can be used as a virtual customer support agent, handling common queries, providing information, and resolving issues.

      * **Sales Assistance**: ChatGPT can act as a virtual sales assistant, engaging with potential customers, answering questions about products or services, and providing recommendations.

      * **Personal Assistant**: ChatGPT can assist individuals in managing their schedules, setting reminders, making appointments, and helping with day-to-day tasks.

      * **Content Creation**: ChatGPT can generate blog posts, social media captions, or marketing copy, helping businesses with their content creation needs.

      * **Language Translation**: ChatGPT can facilitate real-time language translation, allowing users to communicate with individuals who speak different languages.

      * **Lead Generation**: ChatGPT can engage website visitors, qualify leads, and collect contact information, enhancing lead generation efforts for businesses.

      * **Training and Education**: ChatGPT can be utilized as a virtual tutor or trainer, providing personalized learning experiences, answering questions, and delivering educational content.

      * **Market Research**: ChatGPT can conduct surveys, gather feedback, and analyze customer preferences, helping businesses gain insights for market research purposes.

      * **Virtual Event Host**: ChatGPT can serve as a virtual event host, guiding attendees, answering questions, and providing information about the event agenda or sessions.

      * **Personal Entertainment**: ChatGPT can engage users in entertaining conversations, tell jokes, share interesting facts, or even play interactive storytelling games for personal enjoyment.

      The sky(net) is the limit!

      ### What are the takeaways?

      ChatGPT, or AI in general, is being developer at an incredible pace. What we mustn’t forget is that we also need to take into account how the user interacts with AI. By creating a more natural conversation with the use of voice and sound we vastly improve the user experience in interacting with these products. By no means is a regular chat interface bad, it just is really good for quite some use cases. That doesn’t mean we shouldn’t explore other possibilities and create awesome new user experiences!


      I feel like the match between AI and voice is great! As mentioned earlier, I’ve created an application that used the SpeechRecognition Web API over six years ago and never since! Even though I found it cool, I hadn’t find the actual use case for the technique up until creating this demo application. Sometimes combining older techniques and principles with new state-of-the art technology can lead to some magic.


      Take my concept, think about some practical applications you might have (at your company) and try it out! Let’s make super cool products!

    date: 2023-11-02T00:00:00.000Z
    slug: interacting-with-chat-gpt-through-voice-ui-on-the-web
    tags:
      - front-end
    intro: >-
      I probably don’t have to tell you what an enormous impact the rise of AI has had on the industry in recent times. It’s amazing to see all the progress that is being made. I knew when I was looking at an upcoming two-day hackathon at iO, I just needed to build something cool with ChatGPT. More particularly, the way you interact with ChatGPT.
    teaserCopy: >-
      How can I improve the way someone interacts with ChatGPT? How can I make it feel more natural than a dreadful “chatbot”? Can I create something cool? Those were some of the questions I asked myself recently while starting a two-day hackathon at iO. I’ll take you through what I build, how, and most importantly, why.
    teaserImage: /img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva.png
    title: >-
      Interacting with ChatGPT through Voice UI on the web
  - type: articles
    body: >-
      A few weeks ago I was lucky enough to visit the Google Campus in San Francisco through the Google Developer Expert program I am part of.

      ![Dave bitter on the Google Campus in San Francisco riding a Google bike](/img/articles/view-transitions-api-animated-interactions-dave-google-campus.jpeg)

      There, [Una Kravets](https://twitter.com/Una) showed [a demo](https://codepen.io/una/pen/eYbOOQp) she built using the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) to animate the deletion of cards. This excited me to look at using the API for not just page transitions, but more for micro animations!

      ## Give feedback to the user

      As always, I made to see what we can do with this approach:


      <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="JjwgdRZ" data-user="davebitter" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
        <span>See the Pen <a href="https://codepen.io/davebitter/pen/JjwgdRZ">
        View Transitions Animate Cards</a> by Dave Bitter (<a href="https://codepen.io/davebitter">@davebitter</a>)
        on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


      [View on CodePen](https://codepen.io/davebitter/full/JjwgdRZ)


      First, I created a layout like I would normally do. Next, I wrote some JavaScript to remove a list item with a small delay to see it get the checked state first. Removing an item looked like this:


      ```jsx

      list.addEventListener('change', (e) => {
        setTimeout(() => {
          removeListItemFromInputChangeEvent(e)
        }, 300)
      })

      ```


      ![Screen recording showing an item being removed and the grid of cards immediately snap into place](/img/articles/view-transitions-api-animated-interactions-removing-unanimated.gif)

      The user experience of removing an item is not great. Because the item is removed, the item next to it now takes it place. Suddenly, this item is in the place of the removed one which makes it look like it was always there. What if we can remove it, have all the items neatly animate to their new position and by doing that give the user the proper feedback they need? In the past, this took quite a bit of JavaScript to do and even then it worked a bit janky. Now let’s (technically) add two lines of code. First, wrap the call of the remove function in a `startViewTransition`. For good measure, we’ll also feature check to progressively enhance the user experience. Meaning, if the View Transitions API is supported, we enhance the default behaviour with a nice animation:


      ```jsx

      list.addEventListener('change', (e) => {
        setTimeout(() => {
          if (!document.startViewTransition) {
            removeListItemFromInputChangeEvent(e)
          } else {
            document.startViewTransition(() => {
              removeListItemFromInputChangeEvent(e)
            })
          }
        }, 300)
      })

      ```


      Next, we add unique name to each of the list items:


      ```jsx

      <li style="view-transitions-name: card-1">
        <label>
          <input type="checkbox" />
          Check this card
        </label>
      </li>

      ```


      Now if we delete an item, we see this behaviour:

      ![Screen recording showing an item being removed and the grid of cards animate into place](/img/articles/view-transitions-api-animated-interactions-removing-animated.gif)

      With just adding the `document.startViewTransition` and a unique `view-transitions-name` for each list item, the entire grid repositioning is animated providing better feedback to the user. Awesome, right? One of the biggest benefits I find of this approach is that the View Transitions API just takes a before and after state. It doesn’t matter how you build your layout, what properties change or how different the two views are. As long as before and after your change (the removal of the one list item node) items have matching `view-transitions-name` properties, the browser will animate between them.


      Now, let’s add a button that allows you to add a new item:


      ```jsx

      addButton.addEventListener('click', () => {
        addListItem()
      })

      ```

      ![Screen recording showing an item being added and the grid of cards immediately snap into place](/img/articles/view-transitions-api-animated-interactions-adding-unanimated.gif)

      We see the same unanimated behaviour as previously when deleting an item. Now let’s add the `document.startViewTransition` again:


      ```jsx

      addButton.addEventListener('click', () => {
        if (!document.startViewTransition) {
          addListItem()
        } else {
          document.startViewTransition(() => {
            addListItem()
          })
        }
      })

      ```


      ![Screen recording showing an item being added and the grid of cards animate into place](/img/articles/view-transitions-api-animated-interactions-adding-animated.gif)

      As you can see, now when an item is added, the rest of the items animate to their new position. We can even add a bit of JavaScript that will randomly reorder the list and see what this technique will do:

      ![Screen recording showing an items being randomly reordered and the grid of cards animate into place](/img/articles/view-transitions-api-animated-interactions-reordering-animated.gif)

      ## Some other use cases

      While having a grid of cards that may be filtered is a pretty common use case, you can naturally take this approach to other interactions as well. More than likely, you are working/have worked with tables. When adding to, removing from, sorting or filtering these tables the rows may change position. When calling the `startViewTransition` you can animate the changing of the rows like so:

      ![Screen recording showing an items being reordered, removed and added and the grid of cards aniamte into place](/img/articles/view-transitions-api-animated-interactions-table-animated.gif)

      You may have noticed I added a toggle to this demo for showing the items in a grid or underneath each other. When switching, that looks like this:

      ![Screen recording showing the grid of cards toggle between grid and table view and immediately snap into place](/img/articles/view-transitions-api-animated-interactions-toggling-unanimated.gif)

      I though to myself, why not use this technique when switching between the two views?

      ![Screen recording showing the grid of cards toggle between grid and table view and animating into place](/img/articles/view-transitions-api-animated-interactions-toggling-animated.gif)

      ## Start using this now

      It has never been easier to animate between different views on the page. Whilst animating between pages might be a bit much to start with, try implementing the View Transitions API on a smaller part of a page to make smoother experiences in your web application whilst simultaneously providing feedback for a user’s interactions through animation. It only takes a line or two!

      <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="JjwgdRZ" data-user="davebitter" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
        <span>See the Pen <a href="https://codepen.io/davebitter/pen/JjwgdRZ">
        View Transitions Animate Cards</a> by Dave Bitter (<a href="https://codepen.io/davebitter">@davebitter</a>)
        on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


      [View on CodePen](https://codepen.io/davebitter/full/JjwgdRZ)

    date: 2023-10-20T00:00:00.000Z
    slug: view-transitions-api-animated-interactions
    tags:
      - front-end
      - css
    intro: >-
      You might have heard about the View Transitions API in the context of animating between web pages. Whilst this is certainly awesome, you can apply this approach on a way smaller level to create awesome animated interactions in your web applications!
    teaserCopy: >-
      Transform your web app with two lines of code – create seamless animated interactions using the View Transitions API.
    teaserImage: /img/articles/view-transitions-api-animated-interactions-hero.png
    title: >-
      Make awesome animated interactions with two lines of code
  - type: articles
    body: >-
      Finite State Machines (FSMs) are a concept in programming that helps model complex systems with a fixed set of states and transitions between those states. In JavaScript, FSMs offer a structured approach to managing application logic for making code more organised, easier to maintain and more.

      ## What is a Finite State Machine?

      An FSM is a model that consists of three main components:

      * **States**: the distinct stages or conditions an application can be in at any given moment

      * **Transitions**: the description of how the FSM moves from one stage to the other

      * **Events**: the triggers for a transition of state


      ### Example of an FSM

      Let’s have a look at an example to make this concept more practical. Imagine an e-commerce website that tracks the status of a user's order. The order can be in various states, such as `"Pending"`, `"Processing"`, `"Shipped"` and `"Delivered"`. The system is designed without using an FSM, relying on complex nested if-else statements to handle state transitions:


      ```jsx

      let orderStatus = 'Pending'

      const updateOrderStatus = (event) => {
        if (orderStatus === 'Pending' && event === 'ProcessOrder') {
          orderStatus = 'Processing'
        } else if (orderStatus === 'Processing' && event === 'ShipOrder') {
          orderStatus = 'Shipped'
        } else if (orderStatus === 'Shipped' && event === 'DeliverOrder') {
          orderStatus = 'Delivered'
        } else {
          console.log('Invalid state transition or event.')
        }
      }

      ```


      Usually this is the moment I get a coffee to start figuring out what the business logic is in this function. As the codebase grows, more state transitions are added, leading to a convoluted and error-prone `updateOrderStatus` function. The lack of structure and clear separation between states and transitions make it challenging to maintain, debug, and extend the code.


      By using an FSM, we can significantly improve the code's clarity and maintainability. Let's see how the same order status functionality can be implemented with an FSM:


      ```jsx

      const states = {
        PENDING: 'Pending',
        PROCESSING: 'Processing',
        SHIPPED: 'Shipped',
        DELIVERED: 'Delivered',
      };

      const transitions = {
        ProcessOrder: {
          [states.PENDING]: states.PROCESSING,
        },
        ShipOrder: {
          [states.PROCESSING]: states.SHIPPED,
        },
        DeliverOrder: {
          [states.SHIPPED]: states.DELIVERED,
        },
      };

      let orderStatus = states.PENDING;

      const function updateOrderStatus => (event) {
        const nextState = transitions[event][orderStatus];

        if (nextState) {
          orderStatus = nextState;
        } else {
          console.log('Invalid state transition or event.');
        }
      }

      ```


      With the FSM implementation, the code becomes more structured and organised. When calling the `updateOrderStatus` function with `"ProcessOrder"` event, the state can only go to `"Processing"` if the current state is `"Pending"`. This is the same business logic as before, but states and transitions are clearly defined, making it easier to understand the system's behaviour.

      ![Flow chart representing the transitions mentioned above](/img/articles/finite-state-machines-in-javascript-example-flow-chart.jpg)

      As the number of states and transitions increases, the code remains clean and maintainable. For example, if you want to add a cancelled order state, you simply update the states and transitions objects:


      ```jsx

      const states = {
        PENDING: 'Pending',
        PROCESSING: 'Processing',
        SHIPPED: 'Shipped',
        DELIVERED: 'Delivered',
        CANCELLED: 'Cancelled',
      };

      const transitions = {
        ProcessOrder: {
          [states.PENDING]: states.PROCESSING,
        },
        ShipOrder: {
          [states.PROCESSING]: states.SHIPPED,
        },
        DeliverOrder: {
          [states.SHIPPED]: states.DELIVERED,
        },
        CancelOrder: {
          [states.PENDING]: states.CANCELLED,
          [states.PROCESSING]: states.CANCELLED,
        }
      };

      let orderStatus = states.PENDING;

      const function updateOrderStatus => (event) {
        const nextState = transitions[event][orderStatus];

        if (nextState) {
          orderStatus = nextState;
        } else {
          console.log('Invalid state transition or event.');
        }
      }

      ```


      As you might notice, for the `CancelOrder` transition the state can only be cancelled if the order was in the “Pending” or “Processing” state. Other wise the user can’t cancel and as there is no transition implemented and you can handle your logic accordingly.

      ## Benefits of Using Finite State Machines in JavaScript:

      * **Clarity and Organization:**
        FSMs provide a clear and organised representation of application logic. By breaking down complex behaviour into states and transitions, FSMs make the codebase more comprehensible and easier to follow. This clarity ensures that developers, both new and experienced, can understand the system's behaviour without diving into intricate details.

      * **Modularity and Reusability:**
        FSMs encourage modularity by compartmentalising states and transitions. Each state represents a well-defined portion of functionality, making it easy to reuse and combine states across different parts of the application. This modular approach reduces code duplication and allows developers to build applications with more flexibility.

      * **Predictable Behavior:**
        FSMs enable predictable behaviour in an application. Since each state and transition is explicitly defined, the system's responses to events become consistent and deterministic. Predictable behaviour is crucial for building robust and reliable applications, as it reduces the likelihood of unexpected bugs and unpredictable user experiences.

      * **Easy Debugging and Testing:**
        With FSMs, debugging and testing become more straightforward. The structured representation of states and transitions simplifies the process of identifying potential issues and bugs. Additionally, writing test cases for FSMs becomes more manageable, as each state can be tested independently, verifying that the system behaves correctly in different scenarios.

      * **State Management:**
        FSMs provide a systematic way to manage the application's state changes. As the system evolves, FSMs help developers maintain a clear overview of the states and their relationships. This structured state management contributes to better code maintainability, scalability, and overall code quality.

      Finite State Machines offer a structured and organised approach to managing stateful behaviour in JavaScript applications. The benefits of FSMs, including clarity, modularity, predictability, easy debugging, and better state management, make them a valuable tool for simplifying complex systems and enhancing code quality. By embracing Finite State Machines, developers can avoid the issues that arise from poorly managed application logic and build more robust and maintainable JavaScript applications.

    date: 2023-08-01T00:00:00.000Z
    slug: finite-state-machines-in-javascript
    tags:
      - front-end
      - javascript
    intro: >-
      Finite State Machines (FSMs) are a concept in programming that helps model complex systems with a fixed set of states and transitions between those states. In JavaScript, FSMs offer a structured approach to managing application logic for making code more organised, easier to maintain and more.
    teaserCopy: >-
      Application state can make any application complex real quick. Let’s have a look at Finite State Machines in Javascript to resolve some of these complexities.
    teaserImage: /img/articles/finite-state-machines-in-javascript-hero.jpg
    title: >-
      Finite State Machines in JavaScript
  - type: articles
    body: >-
      I often use LocalStorage (or SessionStorage) to store structured data on the client for demos and real projects. While this worked fine, I’ve always had a nagging feeling that there would be a better way than `JSON.parse` and `JSON.stringify` large arrays on every change. Let’s have a look at why IndexedDB might be a better choice for you than the Storage API.

        The LocalStorage and SessionStorage are herded under the Web Storage API. I will compare the Web Storage API to the IndexedDB API in this article. While you’ll see that IndexedDB is far richer in features, I will try to stick to the basics to meet my needs in storing structured data persisted in the user’s browser.

        ## Oranges and Apples

        In essence, with the Storage API, you’re limited to a get and set method where you can pass a key and a (string) value:

        ```jsx
        window.localStorage.setItem(
          'tasks',
          JSON.stringify([
            {
              id: 1,
              title: 'Learn JavaScript',
              completed: true,
            },
            {
              id: 2,
              title: 'Learn Vue',
              completed: false,
            },
            {
              id: 3,
              title: 'Build something awesome',
              completed: false,
            },
          ])
        )

        const tasks = JSON.parse(window.localStorage.getItem('tasks'))
        ```

        This is great for simple key-value storing, but not so much for more structured data. A quick comparison:

        | Feature         | Web Storage                        | IndexedDB                                    |
        | --------------- | ---------------------------------- | -------------------------------------------- |
        | Data Structure  | Key-value pairs                    | Object store, key-value pairs                |
        | Storage Limit   | Typically around 5MB per origin    | Larger storage capacity (varies per browser) |
        | Querying        | Limited querying capabilities      | Advanced querying with indexes               |
        | Transactional   | No                                 | Yes                                          |
        | Indexing        | No                                 | Support for indexes                          |
        | Data Types      | Limited to strings                 | Supports complex data structures             |
        | Browser Support | Widely supported across browsers   | Widely supported across browsers             |
        | Data Retention  | Persistent                         | Persistent                                   |
        | Use Cases       | Storing simple data, small amounts | Storing structured data, larger amounts      |

        More simply put, the storage API is a key-value store while IndexedDB is an actual database. So why do we try to jam everything in the key-value store? Well, it’s easy! The path of least resistance is often chosen while it might make the actual code for updating and deleting items more complex.

        ## Using IndexedDB

        Like every technique I like to learn, I first try to create an actual demo so I run into real-world requirements and issues while building. This time, I went for a good old todo app that persists data in the user’s browser:

        ![Screenshot of a todo app with a form and a list of tasks](/img/articles/indexed-db-web-storage-todo-app.png)

        You can [view the demo here](https://indexed-db-demo.davebitter.com/) and [view the source code over at GitHub](https://github.com/DaveBitter/indexed-db-demo).

        As I’m going to add quite a bit of functionality for the IndexedDB database, I’ll first create a helper in a separate file structured like this:

        ```jsx
        let openRequest

        export const db = {
          // Open the database and create the tasks object store if needed
          openDB: () => {
            return new Promise((resolve, reject) => {})
          },
          // Add a task to the database
          addTask: (task) => {
            return new Promise((resolve, reject) => {})
          },
          // Get all tasks from the database
          getAllTasks: () => {
            return new Promise((resolve, reject) => {})
          },
          // Update a task in the database
          updateTask: (task) => {
            return new Promise((resolve, reject) => {})
          },
          // Delete a task from the database
          deleteTask: (id) => {
            return new Promise((resolve, reject) => {})
          },
        }
        ```

        With these methods, I should be able build all the functionality the todo app. Let’s go over them one by one.

        ### Opening the database store

        With IndexedDB you need an object store for data. You can see this as a collection in your database. I need to either retrieve an existing tasks store or create a new one if it doesn’t exist yet. You can do this like this:

        ```jsx
        let openRequest

        export const db = {
          // Open the database and create the tasks object store if needed
          openDB: () => {
            return new Promise((resolve, reject) => {
              openRequest = indexedDB.open('tasks', 1)

              openRequest.onupgradeneeded = () => {
                const db = openRequest.result
                if (!db.objectStoreNames.contains('tasks')) {
                  db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true })
                }
              }

              openRequest.onsuccess = () => {
                resolve(openRequest.result)
              }

              openRequest.onerror = () => {
                reject(openRequest.error)
              }
            })
          },

          // ...
        }
        ```

        First I create a variable called `openRequest` to store the opened database to be used in other methods coming up next. Then I call `indexedDB.open('tasks', 1)` and store it in the variable. The first parameter is the name of the store, the second one is the version of the database.

        You can use `onupgradeneeded` to create object stores. There I check wether it already exists or I need to create one. When creating, you notice that I pass a `keyPath`. By specifying that the `keyPath` is the `id` property of the task, I can later easily update or delete a task by passing the `id` of the task. By passing `autoIncrement: true` IndexedDB will automatically fill this property incremented based on the highest `id`. I can call `onsuccess` and `onerror` to handle whether the object store was created successfully or not.

        Great! I now have an object store to work with! Let’s add the actual methods allowing me to perform CRUD operations.

        ### Creating a new task

        Firstly, I want to be able to add a new task to the object store. I’ve build a form to gather the data and now need a method to pass the task object to:

        ```jsx
        let openRequest

        export const db = {
          // ...

          // Add a task to the database
          addTask: (task) => {
            return new Promise((resolve, reject) => {
              const db = openRequest.result
              const transaction = db.transaction(['tasks'], 'readwrite')
              const store = transaction.objectStore('tasks')

              const addRequest = store.add(task)

              addRequest.onsuccess = () => {
                resolve(addRequest.result)
              }

              addRequest.onerror = () => {
                reject(addRequest.error)
              }
            })
          },

          // ...
        }
        ```

        First, I get the database from the `openRequest` by getting the `result` property. Next I need to create a transaction. A transaction is basically series of operations that all need to pass successfully in order for the entire transaction to be applied. If one operation fails, all the operations won’t be applied. In this article I won’t go to deep into this, but you can [read more on transactions here](https://www.dbvis.com/thetable/database-transactions-101-the-essential-guide/#:~:text=A%20database%20transaction%20is%20a,operations%20performed%20within%20a%20DBMS.). First I pass an array of object stores I want to modify. In my use case, I only need to make an update to `'tasks'`. Secondly I pass the type of operations I want to perform. As I’m retrieving and writing data I need to pass `'readwrite'`.

        Next, I get the `'tasks'`store from the transaction and I call the `add` method with the task data. Again, I have `onsuccess` and `onerror` handlers that I can use to provide feedback in my application.

        And that’s it! Note how much easier this code is compared to using the WebStorage API and having to get all the tasks, go over all of them until I find the one to update, update the task and storing the entire list again. With IndexedDB I can just call the `add` method.

        ### Reading all tasks

        The second step is to create a method to retrieve all the tasks for the object store so I can display them in the UI. Let’s create a method that does just that:

        ```jsx {13}
        let openRequest

        export const db = {
          // ...

          // Get all tasks from the database
          getAllTasks: () => {
            return new Promise((resolve, reject) => {
              const db = openRequest.result
              const transaction = db.transaction(['tasks'], 'readonly')
              const store = transaction.objectStore('tasks')

              const getAllRequest = store.getAll()

              getAllRequest.onsuccess = () => {
                resolve(getAllRequest.result)
              }

              getAllRequest.onerror = () => {
                reject(getAllRequest.error)
              }
            })
          },

          // ...
        }
        ```

        This method works much like the `addTask` method. The only real difference is that I just need `readonly` for the transaction and I call the `getAll` method to retrieve all tasks.

        ### Updating a task

        As you might have noticed in the Todo demo, I have a checkbox where I can set the status of a task to be complete or incomplete. For this, I need to be able to make an update to (the `status` property of) the task:

        ```jsx {13}
        let openRequest

        export const db = {
          // ...

          // Update a task in the database
          updateTask: (task) => {
            return new Promise((resolve, reject) => {
              const db = openRequest.result
              const transaction = db.transaction(['tasks'], 'readwrite')
              const store = transaction.objectStore('tasks')

              const putRequest = store.put(task)

              putRequest.onsuccess = () => {
                resolve(putRequest.result)
              }

              putRequest.onerror = () => {
                reject(putRequest.error)
              }
            })
          },

          // ...
        }
        ```

        The only real difference between this method and the `addTask` method is that I call the `put` method instead of `add`.

        ### Deleting a task

        Finally, I want to be able to delete a task from the database:

        ```jsx {13}
        let openRequest

        export const db = {
          // ...

          // Delete a task from the database
          deleteTask: (id) => {
            return new Promise((resolve, reject) => {
              const db = openRequest.result
              const transaction = db.transaction(['tasks'], 'readwrite')
              const store = transaction.objectStore('tasks')

              const deleteRequest = store.delete(id)

              deleteRequest.onsuccess = () => {
                resolve(deleteRequest.result)
              }

              deleteRequest.onerror = () => {
                reject(deleteRequest.error)
              }
            })
          },

          // ...
        }
        ```

        You guessed it, I just have to call `delete` with the id of the task to remove a task.

        ## Is IndexedDB worth moving over from the good ol’ simple Web Storage?

        Although they both offers persistent storage on the user’s browser, I see a clear distinction between the two. Web Storage is great for storing simple key-value pairs. There is no boiler plating needed, you just get and set items. For structured data I feel IndexedDB offers a way better API. Yes, there is more API specific code needed, but let’s have a look at actually using the Web Storage API for the todo app. You are going to need to write the logic for updating, retrieving and deleting a specific item yourself. So although the IndexedDB API requires more API-specific code, you’ll end up with roughly the same code with either of the options.

        By abstracting away the database logic into the helper I’ve shown before, you or your team still have simple methods to call in your application, but under water you are using a far more robust and structured-data specific solution to persist data on the user’s browser. Not to mention the other benefits like performance, larger storage capacity and advanced querying.

        In the end, you have to decide for yourself. The goal of this article is not to make you feel bad about (perhaps mis-) using the Web Storage API, but rather show how easy it could be with an abstraction helper to use the IndexedDB API. From now on I’ll be using the IndexedDB to persist more complex data structures in the user’s browser for my applications. Thanks for learning together!

    date: 2023-07-20T00:00:00.000Z
    slug: indexed-db-web-storage
    tags:
      - front-end
      - es6
    intro: >-
      Explore the advantages of IndexedDB over the Web Storage API as a more efficient and sophisticated alternative for storing structured data on the client, eliminating the need for repetitive JSON parsing and stringifying operations.
    teaserCopy: >-
      Explore the advantages of IndexedDB over the Web Storage API as a more efficient and sophisticated alternative for storing structured data on the client, eliminating the need for repetitive JSON parsing and stringifying operations.
    teaserImage: /img/articles/indexed-db-web-storage-hero.jpg
    title: >-
      IndexedDB > Web Storage
  - type: articles
    body: >-
      GitHub is often one of the more overlooked social platforms that developers use. While having an active Twitter or LinkedIn account is great, you should have a look at your GitHub profile.

      ## Why should I care

      As developers, it’s important to share what we do on GitHub. I'm a consultant which means I’m mostly working for clients. Whenever I have an interview with a client, I want to show what I can do. While resumes are important, often the best way to review a developer is to see what they build. What choices do they make, what level do they operate on, what area of development do they focus on? These are just some questions that can be answered with a combination of having a good resume and a GitHub profile. Next to that, having projects publicly available can help fellow developers to learn how you solved a problem. In short, it can be a mirror of you as a developer.

      ## The basics

      GitHub offers a few tools for you to add content to your profile. Make sure to always offer these basics. Ensure to have a representable profile picture and fill in the basic details like your name. It sounds obvious, but developers often have a nickname as their GitHub username. GitHub allows you to specify your actual name alongside. Next, you can specify your role which is a good way to tell people what you actually do. Make sure to link to your other, often more active, platforms like Twitter, LinkedIn and your personal (blogging) website. Finally, if your organization is on GitHub, make sure to join them. Great, your basic profile will now look something like this:

      ![Screenshot of basic information on my GitHub account](/img/articles/how-to-make-your-github-profile-stand-out-github-profile-basics.png)

      ## Have actual (demo) projects on your GitHub profile

      A well-filled and diverse set of projects on your GitHub profile is great, but how do you get there? From experience, most of the work that I did was done in codebases at a company that are not shared publicly. That’s why I love to work on several side projects and demos that I can actually share.


      Now I hear you thinking, Dave, I don’t have months to build a full-fledged application just to show to people. I know, neither do I! I like to learn by doing. So, the approach that I take is to build something when learning a new technique. Often, I write an article or create a talk, including a demo and share it with the world. Some examples off the top of my head are:


      A real-time scrum poker app I build to try out Remix and Supabase.

      ![Screenshot of grid where a user can select an effort they think a task should be](/img/articles/how-to-make-your-github-profile-stand-out-remix-scrum-poker.png)

      * Talk: [https://www.youtube.com/watch?v=cPnUKJ4zfTo](https://www.youtube.com/watch?v=cPnUKJ4zfTo)

      * GitHub: https://github.com/DaveBitter/remix-scrum-poker

      * Demo: [https://scrum-poker.davebitter.com/](https://scrum-poker.davebitter.com/)


      A fictitious futuristic sneaker webshop to try out the View Transitions API

      ![Screenshot of the overview page with a product grid for a futuristic sneaker store](/img/articles/how-to-make-your-github-profile-stand-out-view-transitions-api.png)

      * Article: [https://techhub.iodigital.com/articles/the-view-transitions-api](https://techhub.iodigital.com/articles/the-view-transitions-api)

      * GitHub: https://github.com/DaveBitter/view-transitions-api-demo

      * Demo: [https://view-transitions-api-demo.davebitter.com/](https://view-transitions-api-demo.davebitter.com/)


      A showcase of the Face Detection API for smart face cropping:

      ![A photo of a man with a red rectangle drawn on his face](/img/articles/how-to-make-your-github-profile-stand-out-face-detection-api.png)

      * Article: [https://techhub.iodigital.com/articles/native-face-detection-cropping](https://techhub.iodigital.com/articles/native-face-detection-cropping)

      * GitHub: https://github.com/DaveBitter/face-cropper-demo

      * Demo: [https://face-cropper-demo.davebitter.com](https://face-cropper-demo.davebitter.com/)


      Sometimes I need some inspiration, however. When I set out to actually create a small (demo) project I often look at the [Frontend Mentor challenges](https://www.frontendmentor.io/challenges). It has a great set of already designer projects that you can build. An example of one I build is the Pomodoro:

      ![A screenshot of a purple pomodoro timer](/img/articles/how-to-make-your-github-profile-stand-out-pomodoro.png)

      * GitHub: https://github.com/DaveBitter/pomodoro

      * Demo: [https://pomodoro.davebitter.com/](https://pomodoro.davebitter.com/)


      ### Small projects that were quick to build

      This is just a small selection of the projects you can find on [my GitHub](https://github.com/DaveBitter). One thing most of them have in common is that they’re pretty small projects that were quick to build. Some of them took a few hours or a day. There often is a misconception that you need to spend months on a project for it to be on your GitHub profile. Each of these projects highlights a different skill I want to represent. One might be a showcase for a framework, while another might be more focused on how I split out components. Just get started creating these little projects and share them with the world. Bonus points if you write an article alongside them you can also publish!

      ### Eliminate time lost starting up

      I tend to do a lot of side projects because I like to try out and explore instead of just reading about something. This leads to quite a few public and private repositories on my GitHub (at the time of writing ~110). Most of these never see the light of day, but still require a project set up to get started. I like to have a few things like frameworks, linting, testing etc. setup. To be able to do that I make use of my [template repository](https://github.com/DaveBitter/next-boilerplate).


      Template repositories are great to eliminate losing time when starting up. They let you create a full project in a separate repository that serves as the template. It then makes it easy to start a create a new repository that is basically a clone of the template without things like the Git history. Learn more about template repositories in [my article](https://www.davebitter.com/quick-bits/github-template-repositories) or [YouTube video](https://www.youtube.com/watch?v=zCKwIApdNXw).

      ### Write a proper project Readme

      When visiting the projects above on GitHub you might notice some similarities in the Readme of each project. Often, I see people just having the code in the repository with a (nearly) empty Readme. This is where I believe you can make a difference in having (your projects on) your GitHub profile stand out. Take a look at [the Readme for the Pomodoro project](https://github.com/DaveBitter/pomodoro#readme) I build:

      ![A screenshot of the Readme of the Pomodoro project on GitHub](/img/articles/how-to-make-your-github-profile-stand-out-pomodoro-readme.png)

      In this Readme I:

      * Give a title to the project

      * Write a one-line description of what the project does

      * Show a screenshot to make the project visual

      * Provide a link to the demo

      * Give a Getting Started guide

      * Describe the tech stack used

      * Make sure to also add all this information in the corresponding GitHub repository fields


      This only took me a few minutes to do but drastically changes the information somebody has on what you build. Don’t overlook adding this!

      ## Going the extra mile for your profile page

      As so many developers don’t have a well-filled GitHub profile filled with awesome projects, you will most likely already stand out with these covered. Next, GitHub offers to pin up to six repositories on your profile page. Make a selection of the project you want to showcase:

      ![A screenshot of my GitHub profile with six repository cards pinned](/img/articles/how-to-make-your-github-profile-stand-out-github-profile-pinned-repositories.png)

      That is already starting to look better! There is one step we can take however to take it to the next level. We can add a GitHub Profile Readme:

      ![A screenshot of my GitHub Profile Readme where I introduce myself](/img/articles/how-to-make-your-github-profile-stand-out-github-profile-readme.png)

      In essence, a GitHub Profile Readme is a markdown file that will be shown above your pinned repositories. The easiest way to do this is to create a new repository with the same name as your GitHub username. In my case, that will be [https://github.com/DaveBitter/DaveBitter](https://github.com/DaveBitter/DaveBitter). There, you add a Readme file at the root of the project with any content you want. For more information, you can read my article on the [GitHub Profile Readme](https://www.davebitter.com/quick-bits/github-profile-readme) or watch my [YouTube video](https://www.youtube.com/watch?v=ewtT4NJX6NA) explaining it. In the YouTube video, I go over some amazingly creative examples listed on [this page](https://github.com/abhisheknaiidu/awesome-github-profile-readme) as well so be sure to check it out!


      Also make sure to check out [GitHub Blocks](https://blocks.githubnext.com/) which allows you to add custom, interactive blocks to your Readme. You can add blocks like live statistics on your repositories, create custom data visualizations and more!

      ### Taking it to the final level

      As you might have noticed, I list my latest articles and YouTube videos in my GitHub Profile Readme. Naturally, I’m not manually adding these every time I post a new one. As the Readme file is just that, I wrote a Node.js script that fetches the latest articles and videos, constructs a Readme file with that data and commits this to the repository. It does this every Sunday using GitHub Actions and a CRON job. If you want to learn more about GitHub Actions, watch [my YouTube video on them](https://www.youtube.com/watch?v=jVg-qkQ01lI).


      To make it easier for you, I’ve created a template repository where everything is already set up for you. Head over to [this GitHub repository](https://github.com/DaveBitter/dynamic-github-profile-readme-template) to get started!

      ## Represent yourself

      As you’ve seen in this article, GitHub is a great place to represent yourself as a developer. By curating your GitHub profile you can stand out from the crowd. Although it will take some effort, you can quite easily build out your presence on the platform. I hope you’ve learned something new in this article and will create your own awesome corner on GitHub!
    date: 2023-05-04T00:00:00.000Z
    slug: how-to-make-your-github-profile-stand-out
    tags:
      - github
    intro: >-
      In this article, we will look at how you can make your GitHub profile stand out from the crowd.
    teaserCopy: >-
      In this article, we will look at how you can make your GitHub profile stand out from the crowd.
    teaserImage: /img/articles/how-to-make-your-github-profile-stand-out-hero.png
    title: >-
      How to make your GitHub profile stand out
  - type: articles
    body: >-
      I’ve worked on many component libraries during my career. One of the main difficulties I find is to keep your components simple, easy to use and cater to many use cases. One of the ways I like to ensure this is to use Inversion of Control through Compound Components. Let’s have a look at both patterns and see how this can help you!

      ## What is Inversion of Control?

      Let’s say you have a list of users and you create a couple of utilities to return filtered lists:

      ```jsx

      const users = [
        {
          name: 'John',
          age: 20,
          country: 'USA',
          hobbies: ['reading', 'swimming'],
        },
        {
          name: 'Peter',
          age: 30,
          country: 'England',
          hobbies: ['running', 'swimming'],
        },
        undefined,
        {
          name: 'Mary',
          age: 25,
          country: 'France',
          hobbies: ['reading', 'hiking'],
        },
      ]


      const getEnglish = (users) => {
        return users.filter((user) => {
          return !!user && user.country === 'England'
        })
      }


      const getThirtyYearOlds = (users) => {
        return users.filter((user) => {
          return !!user && user.age === 30
        })
      }


      const getPeters = (users) => {
        return users.filter((user) => {
          return !!user && user.name === 'Peter'
        })
      }

      ```

      Naturally, it doesn’t make sense to duplicate so much code for every possible filter so you might create a reusable function like this:

      ```jsx

      const filterUsers = (users, attribute, value) => {
        return users.filter((user) => {
          return user[attribute] === value
        })
      }


      const english = filterUsers(users, 'country', 'England')


      const thirtyYearOlds = filterUsers(users, 'age', 30)


      const peters = filterUsers(users, 'name', 'Peter')

      ```

      Now this seems fine, but what if I want to get all French hikers? As hobbies is an array, I need to refactor the `filterUsers` function to also be able to filter for that:

      ```jsx

      const filterUsers = (users, attribute, value) => {
        return users.filter((user) => {
          if (Array.isArray(user[attribute])) {
            return user[attribute].includes(value)
          }


          return user[attribute] === value
        })
      }


      const getFrenchReaders = (users) => {
        return filterUsers(users, 'country', 'France')
      }

      ```

      You can imagine this function getting more and more complex when new requirements come in. The user of this function doesn’t have control and therefore I need to keep adding logic for new use cases. Let’s invert that and let the user have full control:

      ```jsx

      const filterUsers = (users, filterFn) => {
          return users.filter(user => !!user && filterFn(user);
      )};


      const englishSwimmers = filterUsers(users, user => {
          return user.country === 'England' && user.hobbies.includes('swimming');
      });


      const frenchReaders = filterUsers(users, user => {
          return user.country === 'France' && user.hobbies.includes('reading');
      });


      const americanHikers = filterUsers(users, user => {
          return user.country === 'USA' && user.hobbies.includes('hiking');
      });

      ```

      By letting the user of this function pass their filter function, I give them the power to filter however they like.

      Now, I hear you thinking, why would they need to use this function at all and don’t they just filter the array themselves? Good question! In this case, we also check for `undefined` users. Now, this is not a lot of duplicate code for them to add, but you can imagine real-world scenarios to get way more complex than this example. I can invert control to the user of the functions for things that make sense like providing their filter function while still providing logic they would always need like checking for defined users.

      ### Taking this pattern to components

      In this article, I will use React.js for the examples, but this pattern can be applied to any framework. Let’s say you have a list where users can select an item, the component will call a callback with the selected option and it will close the list:

      ```jsx

      import React, { useState } from 'react'


      const SelectList = ({ options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false)


        const handleSelect = (option) => {
          onChange(option)
          setIsOpen(false)
        }


        return (
          <div className="select-list">
            <button className="select-list__button" onClick={() => setIsOpen(!isOpen)}>
              {value}
            </button>

            {isOpen && (
              <ul className="select-list__options">
                {options.map((option) => (
                  <li key={option} className="select-list__option">
                    <button className="select-list__button" onClick={() => handleSelect(option)}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      }

      ```

      Now a user of your component has a requirement where they don’t want to have the list close after a user selects an option. So, you update the component to handle this:

      ```jsx

      import React, { useState } from 'react'

      const SelectList = ({ options, value, onChange, keepOpenAfterSelection }) => {
        const [isOpen, setIsOpen] = useState(false)


        const handleSelect = (option) => {
          onChange(option)


          if (!keepOpenAfterSelection) {
            setIsOpen(false)
          }
        }


        // ...

      }

      ```

      Now, imagine ten other requirements coming in in the coming months. What happens is you enter the [“apropcalypse”](https://twitter.com/gurlcode/status/1002110517094371328?lang=en). Not only will your component handle a vast number of props, it becomes very complex very quickly.

      ### Accepting a state reducer

      The real issue in the simplified example above is that the `handleSelect` function has logic being added to for updating the state it for specific use cases when a prop (`keepOpenAfterSelection`) is passed. Let’s invert this logic. First, we allow the user to pass a state reducer and replace `useState` with `useReducer`. Next, we remove the check for the `keepOpenAfterSelection` prop:

      ```jsx

      import React, { useReducer } from 'react'

      const defaultStateReducer = (state, changes) => ({ ...state, ...changes })

      const SelectList = ({ options, value, onChange, stateReducer = defaultStateReducer }) => {
        const [{ isOpen }, setState] = useReducer(stateReducer, { isOpen: false })

        const handleSelect = (option) => {
          onChange(option)
          setState({ isOpen: false })
        }

        /// ...

      }

      ```

      When a user doesn’t provide a state reducer, the default behaviour is used. But, the user can now take full control like so:

      ```jsx

      import React from 'react'


      const App = () => {
        return (
          <SelectList
            options={['One', 'Two', 'Three']}
            value="One"
            onChange={(value) => console.log(value)}
            stateReducer={(state) => {
              return { ...state, isOpen: true }
            }}
          />
        )
      }

      ```

      As you can see, whenever the SelectList component’s `setState` function is called, the stateReducer callback gets the state passes. There we can return that state, but make an exception as well. Now, this example works for keeping the list open, but you can imagine you can now update any state based on the context of your application and requirements.

      ### The gained benefits by Inversion of Control

      There are quite a few benefits gained by inversing control

      * Decreased complexity of the API of your component

        * Improved readability

        * Less prop drilling

        * Clear division of responsibility

      * Easier to refactor the API of your component

      * Allows developers to do whatever they need with the API of your component

      * Easier to create tests due to full control


      The Inversion of Control example you looked at is great, but it’s merely a solution to the state problem I created in the first place. What if I can circumvent this problem in its entirety?

      As far as I see it, the user of the SelectList component has the context of their application and what should be rendered. Let’s give them the power to do just that:

      ```jsx

      import React, { useState } from 'react'


      const SelectList = ({ options, value, onChange, isOpen, onToggle }) => {
        const handleSelect = (option) => {
          onChange(option)
        }


        return (
          <div className="select-list">
            <button className="select-list__button" onClick={() => onToggle(!isOpen)}>
              {value}
            </button>


            {isOpen && (
              <ul className="select-list__options">
                {options.map((option) => (
                  <li key={option} className="select-list__option">
                    <button className="select-list__button" onClick={() => handleSelect(option)}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      }

      ```

      The user then has to update their App component like this:

      ```jsx

      import React, { useState } from 'react'


      const App = () => {
        const [selectListIsOpen, setSelectListIsOpen] = useState(false)


        return (
          <div className="App">
            <SelectList
              options={['One', 'Two', 'Three']}
              value="One"
              onChange={(value) => console.log(value)}
              isOpen={selectListIsOpen}
              onToggle={(isOpen) => setSelectListIsOpen(isOpen)}
            />
          </div>
        )
      }

      ```

      Sure, the state is now gone from the component, but now we are left with the original problem of a large number of props that the component needs to accept. Let’s use compound components.

      ## What are Compound Components?

      The idea of Compound Components is to have multiple components work together where they won’t make much sense on their own. You are most likely already familiar with this concept. Let’s look at the native select element in HTML:

      ```jsx

      <select>
        <option value="One">One</option>
        <option value="Two">Two</option>
        <option value="Three">Three</option>
      </select>

      ```

      On their own, `select` and `option` don’t make much sense, but when combined they provide a useful interaction. Let’s first update the SelectList to offer this and look at the benefits of this approach:

      ```jsx

      import React from 'react'


      const SelectListToggle = ({ children, onClick }) => {
        return (
          <button className="select-list__button" onClick={onClick}>
            {children}
          </button>
        )
      }


      const SelectListItems = ({ children }) => {
        return <ul className="select-list__options">{children}</ul>
      }


      const SelectListItem = ({ children, onClick }) => {
        return (
          <li className="select-list__option">
            <button className="select-list__button" onClick={onClick}>
              {children}
            </button>
          </li>
        )
      }


      const SelectList = ({ children }) => {
        return <div className="select-list">{children}</div>
      }


      SelectList.Toggle = SelectListToggle
      SelectList.Items = SelectListItems
      SelectList.Item = SelectListItem


      export default SelectList

      ```

      As you can see, all the separate elements that construct a SelectList are split out into separate components. They are then added as a key of `SelectList`. Naturally, you could use the components as is, but this ensures that only SelectList can be imported from the file which has the several sub-components as a key. This way they are always used together. In a minute, I’ll show you how this looks.

      The benefits of splitting the components are:


      * There is a separation of concerns for all parts

      * You can have multiple props called `onClick` across the multiple components as there are no name clashes

      * You can split out props making it easier to read the component

      * It’s easy to add props to a sub-component that are just meant for that sub-component



      So how do I now use this new Compound Component? Let’s have a look:

      ```jsx

      import React, { useState } from "react";


      const App = () => {
        const [selectListIsOpen, setSelectListIsOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState("One");


        return (
          <div className="App">
            <SelectList>
              <SelectList.Toggle
                onClick={() => setSelectListIsOpen(!selectListIsOpen)}
              >
                {selectedOption}
              </SelectList.Toggle>

              {selectListIsOpen && (
                <SelectList.Items>
                  <SelectList.Item onClick={() => setSelectedOption("One")}>One</SelectListItem>
                  <SelectList.Item onClick={() => setSelectedOption("Two")}>Two</SelectListItem>
                  <SelectList.Item onClick={() => setSelectedOption("Three")}>Three</SelectListItem>
                </SelectList.Items>
              )}
            </SelectList>
          </div>
        );
      };


      ```

      The benefits of rendering the SelectList like this are:

      - Implementation logic is moved outside of the component making it easier to fit your needs
        - For instance, what if you need to render the toggle underneath the items instead of above them? Just render it there!
      - The options are not passed as a configuration anymore
        - What if you also want to add an icon in front of the list item? Just render that in through React.js children next to the label
        - The component needs fewer features and updates, but can handle whatever you throw at it
      - It’s clear how this component works
        - You don’t have to open it and scroll to lines of JSX and figure out what happens

      ## What are potential drawbacks?

      Inversion of Control and Compound Components have similar drawbacks. Yes, they reduce the complexity of functions and components, but at the cost of moving some to the user of them. I often hear developers mention that it would be easier for them if all the logic is in the function or component. This is a valid point, but there is an important note to take. Yes, for some simpler ones, this is the case, but through experience, I’ve seen functions and components become so complex that it actually got harder to follow the API of the component (and sometimes hack around it) than it would be to move the logic to the user.

      Next to this, there is quite some more boilerplating. This is in the nature of moving to Compound Components. I’ve found, however, that this is indeed the case, but the code is much clearer and has a lower cognitive load.

      ## Which pattern do I pick and where do I start?

      Well…

      ![Bart Simpson's classmates asking him to say the line, he sighs and says "it depends" and they are cheering](/img/articles/inversion-of-control-through-compound-components-it-depends.png)

      Look at some of the reusable functions and components in your codebase. What is one of the functions or components that you often have to fight against or have to make more complex every time you work with it? Usually, that’s a good start.

      * **Functions with many parameters for different use cases**: use Inversion of Control to simplify them and empower the developer using them.

      * **Components where you're battling state**: pass a state reducer

      * **Components where you’re battling the rendering logic**: use Compound Components


      ## Final thoughts

      Inversion of Control and Compound Components are by no means a one-size-fits-all solution. They merely offer solutions for specific problems. Creating reusable functions and components is hard and we can only learn by doing, refactoring and repeating that cycle.

      For now, thanks for reading!
    date: 2023-04-26T00:00:00.000Z
    slug: inversion-of-control-through-compound-components
    tags:
      - front-end
      - react-js
    intro: >-
      Learn how to keep your component libraries simple, easy to use, and adaptable to many use cases by leveraging Inversion of Control through Compound Components.
    teaserCopy: >-
      Learn how to keep your component libraries simple, easy to use, and adaptable to many use cases by leveraging Inversion of Control through Compound Components.
    teaserImage: /img/articles/inversion-of-control-through-compound-components.webp
    title: >-
      Inversion of Control through Compound Components
  - type: articles
    body: >-
      As a developer, I am always on the lookout for new tools and technologies to make my work easier and more efficient, but simultaneously increase the user experience of it. That's why I was excited to explore the View Transitions API, which is now stable in Chrome and see how it could simplify the process of creating view transitions on the web.

      ## What is the View Transitions API?

      The View Transitions API is a powerful tool that simplifies the process of creating view transitions on the web. It provides a set of built-in transition effects that can be easily customized and combined to create more complex transitions to transition from one page to another.


      I love how this API can easily improve the user experience by adding a small layer to a website. It's a great way to create dynamic and interactive web experiences that will take the websites you build to the next level.

      ## A practical use case

      For my demo of the View Transitions API, I created a fictitious sneaker company in the future called _Neon Sole Society_. All content, including the company name, product brands, product pricing, product descriptions, and even product images, are generated with AI. This is a fun way to make your demo’s more realistic.

      <div style={{display: 'flex', justifyContent: 'center'}} data-reveal-in-view>
      <img src='/img/articles/view-transitions-api-demo.gif' alt='Screen recording of the demo showing an overview with sneakers and a transition to a detailed view of a pair of sneakers'  />
      </div>


      I created a page that displays different types of futuristic sneakers, and when a user clicks on a pair , the page seamlessly transitions to a detailed view of that shoe. I used the built-in transition effects provided by the View Transitions API without any tweaking to see how well it does. Throughout this article, I show simplified code examples that are focused solely on the View Transitions API, making it easy for you to understand how to implement these transitions in their own projects. If you’d like to see all of the code, you can [view the project on GitHub](https://github.com/DaveBitter/view-transitions-api-demo). If you’d like to see the demo in action, head over [here](https://view-transitions-api-demo.davebitter.com/). Keep in mind that at the time of writing, only Chrome has support for this.


      ## Creating the view transition

      To create a view transition, I first added a unique value for the CSS property `view-transition-name` for every product on the overview page. Here's an example of how this might look in the HTML for the demo’s sake:


      ```html

      <li
        class="product"
        style="view-transition-name: waverider-pro-flytech-details"
        data-product="waverider-pro-flytech"
      >
        <div class="product__details" data-product-details>
          <p class="product__name" data-product-name>WaveRider Pro</p>
          <p class="product__brand" data-product-brand>FlyTech</p>
          <p class="product__price" data-product-price>$170</p>
          <a class="product__link" data-product-link>View</a>
          <p class="product__description" data-product-description>
            Introducing FlyTech's WaveRider Pro - the ultimate sneaker for runners and athletes. With a
            sleek and aerodynamic design, it offers unparalleled speed and comfort. Made with the latest
            FlyTech materials for durability and performance, it features a wave-shaped sole for
            unbeatable traction and advanced sensors for real-time feedback on performance. With built-in
            GPS and Bluetooth connectivity, it's perfect for achieving your personal best. Get yours today
            and experience the ultimate in futuristic footwear!
          </p>
        </div>
        <div class="product__image-wrapper">
          <img
            src="./images/products/waverider-pro-flytech.png"
            class="product__image"
            data-product-image
          />
        </div>
      </li>

      ```

      Next, I added an event listener to each product’s link to the detail page. I can then call `preventDefault` and implement the logic for the transition. If the View Transitions API is not supported, I call the `handleViewProduct` function directly, which takes care of updating the route and DOM in a single-page application (SPA) way. If the API is supported, I call the function in the callback function provided to `document.startViewTransition`. Here's an example:

      ```jsx

      const addEventListenersForProduct = (productElement, product) => {
        const productLinkElement = productElement.querySelector('[data-product-link]')

        productLinkElement.addEventListener('click', (e) => {
          e.preventDefault()

          if (!document.startViewTransition) {
            handleViewProduct(product)
          } else {
            document.startViewTransition(() => {
              handleViewProduct(product)
            })
          }
        })
      }

      ```

      Finally, in the `handleViewProduct` function, you can set the `view-transition-name` of the clicked product as the `view-transition-name` of the detail page's product element and render the page. Here's an example:

      ```jsx {18}

      const handleViewProduct = (product) => {
        renderProductDetail()

        window.history.pushState(
          product.slug,
          `${product.name} - ${product.brand}`,
          `/product/${product.slug}`
        )

        const productDetailElement = document.querySelector('[data-product-detail]')
        const { name, brand, price, description, image, slug } = product

        productDetailElement.querySelector('[data-product-name]').innerHTML = name
        productDetailElement.querySelector('[data-product-brand]').innerHTML = brand
        productDetailElement.querySelector('[data-product-price]').innerHTML = price
        productDetailElement.querySelector('[data-product-description]').innerHTML = description
        productDetailElement.querySelector('[data-product-image]').src = image
        productDetailElement.style.viewTransitionName = `${slug}-details`
      }

      ```

      And that’s all! The element will now use sensible defaults to animate between the two views. From here on out, you can tweak the animations to your liking with CSS.

      ## What will this mean for the web?

      Before the View Transitions API, creating smooth and visually appealing view transitions on the web was a difficult and complex process. You had to rely on custom code or third-party libraries to achieve the desired effect, which often led to bloated code and slower page load times. Additionally, the process of creating these transitions was often time-consuming and required a deep understanding of complex CSS animations and JavaScript.


      With the View Transitions API, creating seamless view transitions is now easier and more accessible than ever before. By providing a set of built-in transition effects and a simple API for applying these effects to elements on the page, you can create dynamic and engaging user interfaces without the need for custom code or third-party libraries. This not only simplifies the development process but also leads to faster page load times and a more seamless user experience overall.


      As more developers begin to incorporate the View Transitions API into their projects, we can expect to see a shift towards more engaging and interactive web experiences, ultimately changing the way we navigate and interact with websites and web applications.

    date: 2023-04-11T00:00:00.000Z
    slug: the-view-transitions-api
    tags:
      - front-end
    intro: >-
      The View Transitions API has landed in Chrome. Let’s have a look at how the API works and why it will change the feel of the web.
    teaserCopy: >-
      The View Transitions API has landed in Chrome. Let’s have a look at how the API works and why it will change the feel of the web.
    teaserImage: /img/articles/view-transitions-api-demo.webp
    title: >-
      The File System Access API: Unlocking New Possibilities for Web Developers
  - type: articles
    body: >-
      The web is an incredibly powerful platform that keeps getting better. I’m always on the hunt for new capabilities, like the File System Access API, to create the best user experience on the web. In this article, we’ll have a look at what the File System Access API is, how it works and why this is such a great addition to the web as a platform.

      ## Web capabilities (Project Fugu)

      There is a tremendous stride being made to close the gap between native and the web. Our users expect more and more native-like functionalities for the web. To standardize and offer this, an effort is made to offer APIs for the web that developers can use to enrich their web applications under the name Project Fugu, ontherwise known as Web Capabilities.


      Quite a few API’s that you might already know or use fall under this effort. There is a handy [Fugu API Tracker](https://fugu-tracker.web.app/) that shows you all of them and the status they’re in. You might have read [one of my articles on the FaceDetection API](https://techhub.iodigital.com/articles/native-face-detection-cropping) which is also part of Project Fugu. Today, we’re looking at the File System Access API which is a great addition to the web!

      ## What is the File System Access API for?

      As you might have guessed, this API allows you to access local files on your user’s system. But not just access them, you can perform full [CRUD operations](https://www.freecodecamp.org/news/crud-operations-explained/) straight from the browser. On the one hand, this gave me quite a few exciting idea’s to use this for. On the other hand, it gave me some concerns about potential dangers as well.


      To find the answers to how it works and if it’s safe, I decided to build a small demo application based on the File System Access API. I’m going to show you how you can build a local Markdown editor on the Web. This app will need to be able to **C**reate, **R**ead, **U**pdate and **D**elete local Markdown files on the user’s system.

      ![Screenshot of the demo application showing a sidebar with nested files and a Markdown editor view with an edit field and a preview field](/img/articles/file-system-access-api-web-application.png)

      If you’d like to try the demo you can [visit the web application](https://md-editor.davebitter.com/). Beware that this is for some features dependent on having the experimental features flag set in your Chrome settings. You can do this by going to `chrome://flags`, searching for `#enable-experimental-web-platform-features` and turning it on.

      ![Chrome settings screen to enable experimental features](/img/articles/file-system-access-api-chrome-flags-experimental.png)

      ## How does the File System Access API work?

      This article will show some simplified code examples with any logic outside of the File System Access API stripped. If you do want to view the entire source code for the demo web application, [head over to GitHub to view the repository](https://github.com/DaveBitter/file-system-api-markdown-editor). Let’s have a look at all four of the CRUD operations.

      ### Read

      Firstly, I want to show a sidebar with files just like an IDE. This will look something like this:

      ![Screenshot of the sidebar of the demo application showing nested files](/img/articles/file-system-access-api-sidebar.png)

      Let’s see how you can read files and use the result to create a sidebar like this.

      #### Reading a single file

      To get a single file you can request access like this:

      ```jsx

      const openFile = async () => {
        const [fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: 'Markdown files',
              accept: {
                'text/md': ['.md'],
              },
            },
          ],
          multiple: false,
        })

        // Do something with the file handle
      }


      elements.openFileButton.addEventListener('click', openFile)

      ```

      Quite a few things are happening here. Let’s go over each of them. First, I create an asynchronous function. This is needed because we need to await the file picker window in the next line. Next, I actually request to open the native file of the user with `window.showOpenFilePicker`. You can pass a couple of options here like which files you allow and whether the user can pick multiple. The browser opens a file picker just like how it would do if you show a regular file input:

      ![Screenshot of MacOS UI to pick a directory on the system](/img/articles/file-system-access-api-select-directory.png)

      The user also needs to confirm that they trust my web application and allow me to read the selected files. Note that they only have to do this the first time (per file or directory). The UI looks a bit like this:

      ![Screenshot of MacOS UI to confirm whether you want to allow the website to view the selected directory](/img/articles/file-system-access-api-allow-view-directory.png)

      As the result could be multiple file handles, the result of `window.showOpenFilePicker` is always an array. As I’m only requesting a single file, I can destructure that first file handle and name it `fileHandle`. Finally, I can use the file handle for my web application.


      Like many other powerful APIs, calling the `window.showOpenFilePicker` should be done in a [secure context](https://w3c.github.io/webappsec-secure-contexts/). To do this, you should only call the `openFile` helper function through an event triggered by the user. In this example, that’s done after the user clicks on the button to open a file.

      #### Reading an entire directory (recursively)

      Now, I could allow the user to select multiple files and build the sidebar with those file handles. This is not how an IDE works, however. Usually, you select a directory and it will then create a sidebar showing all the files in that directory with all subdirectories shown as well. Let’s request access to an entire directory instead of just a file.


      This works just like the first example, except you now call `window.showDirectoryPicker` instead of `window.showOpenFilePicker`:

      ```jsx

      const openDirectory = async () => {
        const directoryHandle = await window.showDirectoryPicker({
          types: [
            {
              description: 'Markdown files',
              accept: {
                'text/md': ['.md'],
              },
            },
          ],
        })

        // Do something with the directory handle
      }


      elements.openDirectoryButton.addEventListener('click', openDirectory)

      ```

      The second difference is that I get a single directory handle back as a result of `window.showDirectoryPicker`. To get all the file handles in that directory, I can do this:

      ```jsx

      const fileHandles = directoryHandle.values()

      ```

      I now have an array of all the file handles. Well, the file handles and potentially any directory handles. As there could be subdirectories, there could potentially be directory handles in the array.


      Unfortunately for me, these directory handles don’t contain an array of file handles in that directory. I can, however, do something similar to the `window.showDirectoryPicker` with a directory handle. I can request the file handles in the directory as follows:

      ```jsx

      const [subDirectoryHandle] = fileHandles


      const subDirectoryHandles = subDirectoryHandle.values()

      ```

      Now, if this array of handles contains a directory, I can do it again. This sounds like I need to do some recursive programming to walk through the file tree. I wrote a recursive that would, simplified, look something like this:

      ```jsx

      const getEntriesRecursivelyFromHandles = async (handles) => {
        const entries = []

        for await (const handle of handles) {
          const { kind } = handle

          switch (kind) {
            case 'file':
              entries.push({
                kind,
                handle,
              })
              break

            case 'directory':
              const directoryHandles = await entry.values()

              entries.push({
                kind,
                handle,
                entries: await getEntriesRecursivelyFromHandles(directoryHandles).catch(console.error),
              })
              break
          }
        }

        return entries
      }

      ```

      It might look a bit complex at first, but let’s go over some of the parts. I first create an array that will hold all entries I need to build the sidebar. Then I loop over all the passed handles. If the `kind` of the handle is a file, I can just push a new object to the entries array for that file. If the handle is a directory, I request all the handles for that subdirectory and push an object to the entries array with one additional field. I add an entries key which calls the recursive function with the directory handles for the subdirectory.


      I now have an array of objects with files and directories. If an item is a directory, it will have a key called `entries` which is again an array of files and directories. Great, now let’s use the actual handles.

      #### Using the file handles

      Now that I have this array of handles that is easier to work with, I can start building the sidebar. For the sake of brevity and focus on just the File System Access API, I won’t show the code for this, but please refer to [the project on GitHub](https://github.com/DaveBitter/file-system-api-markdown-editor). Once I have a sidebar with all the file handles, I want to display the Markdown files in a Markdown editor. There are many libraries on NPM that offer a Markdown editor. For this vanilla JS demo, I used [ToastUI Editor](https://ui.toast.com/tui-editor). Once added to the page, it’s time to load the content of the Markdown files into the editor. I can do this, simplified as followed:

      ```jsx

      sidebarItemFileButton.addEventListener('click', async () => {
        const file = await fileHandle.getFile()
        const contents = await file.text()

        editor.setMarkdown(contents)
      })

      ```

      Now, once the user clicks on a sidebar item, the corresponding file handle will be used to get the text content and added to the editor.

      ### Update

      Great, you can see all the files, open them in the editor and make changes. Naturally, you want to save these changes to the filesystem. Let’s see how I can use the file handle to update the content:

      ```jsx

      saveButton.addEventListener('click', async () => {
        const contents = editor.getMarkdown()

        const writable = await fileHandle.createWritable()
        await writable.write(contents)
        await writable.close()
      })

      ```

      First, I add an event listener to the save button. Next, I get the latest content from the Markdown editor. I can then create a writable for the file handle that I’m making changes to, write the updated content and close the writable. While doing this the first time, the user will see another confirmation window to allow the web application to save changes:

      ![Screenshot of MacOS UI to confirm whether you want to allow the website to save the file](/img/articles/file-system-access-api-allow-save-file.png)

      Now, when the user checks the local file, they will see that the changes are saved.

      ### Create

      The user might also want to create a new file in the root or one of the subdirectories. Just like an IDE, I’ve added a button to do so:

      ![Screenshot of a button in the sidebar to create a new file in a directory](/img/articles/file-system-access-api-create-file-button.png)

      I then added an event listener that calls a function that will open a new window in the correct directory to create a new file in:

      ```jsx

      sidebarDirectoryNewFileButton.addEventListener('click', async () => {
        await window.showSaveFilePicker({
          startIn: directoryHandle,
          suggestedName: 'untitled.md',
          types: [
            {
              description: 'Markdown files',
              accept: {
                'text/md': ['.md'],
              },
            },
          ],
        })
      })

      ```

      I use `window.showSaveFilePicker` to trigger the UI for the user to save a new file. I can pass it a configuration to help the user a bit. In this example, I tell it to start in the subdirectory where the user clicked on the button for a new file. Next, I gave it a sensible suggested name. Finally, I told it that a Markdown file will be saved. The user will see the following:

      ![Screenshot of MacOS UI to save a file to the system](/img/articles/file-system-access-api-create-file.png)

      ### Delete

      Finally, I’ve added a button to remove a file or directory. The simplified code example for this is fairly similar and looks like this:

      ```jsx

      sidebarDirectoryRemoveButton.addEventListener('click', async () => {
        await directoryHandle.remove()
      })


      sidebarFileRemoveButton.addEventListener('click', async () => {
        await fileHandle.remove()
      })

      ```

      Although this works for the file handle, there is something to note for the directory handle. While you can remove an empty directory this way, it fails when there are files or subdirectories in that directory. A workaround could be to first remove all the files and subdirectories recursively as you have all the handles for them. Then, you can remove the empty directory.


      And that was the final of the CRUD operations I wanted to offer the user in this demo web application. Naturally, quite a bit of code was added for the UI part, but with these four concepts, you can build an entire web application that uses the local filesystem.

      ## Why is this a great addition to the web as a platform?

      So, now you know how it works. Let’s have a look at why it is important to start using this API.

      ### Improve user experience

      Working with your own local files in a web application has always been a bit cumbersome. You’d have to open a file from your system, make changes through the web application and finally save the file. The saving of the file was the more cumbersome part. You need to overwrite your local file every time and confirm the overwriting in a system popup.


      Native (desktop) apps handle this way better. The native app can save/overwrite a file directly to your local storage. The File System Access API closes this gap between web and native perfectly under project Fugu.

      ### Create performant web applications

      A solution to working with files on the web has therefore usually been to upload a file and have a copy saved in the cloud. Especially with larger files, CRUD operations are slower than directly performing them on the local file. Now, for the demo project you saw earlier this won’t be an issue, but imagine having hundreds of video files. This can be gigabytes of data to load upfront. With the File System Access API this is not an issue as you just need the handles for all those large files and can then load them when needed.

      ### Own your content

      One of the principles I stand for is to own your content. This goes for any articles I write, but can be applied to any form of content. I don’t want to be locked out by a system and lose content that I own. Let’s say that you’re using a major blogging platform. What happens if they decide to suspend your account (perhaps while this is not fair)? Having the files locally on my system at all times is a great way to combat this and still be able to have your content safe.


      An upside of using a platform where your files are in the cloud is that you always have a backup. With smart directories on your machine, this won’t be an issue anymore. For instance, you can have the files locally on a Google Drive synced directory. You will then always have the best of both worlds.

      ## Some inspiration

      Naturally, the File System Access API is great for web apps that modify text like the demo shown in this article. Another great example is a web application like [edit.photo](http://edit.photo) by [Rik Schennink](https://twitter.com/rikschennink). Imagine having local file access to all your photos and saving changes directly. Finally, I think this could be data processing web applications. Especially combining PWA installability (for desktop) with it. Being able to write your own web applications to help you with your daily tasks is really cool!

      ![Screenshot of the demo application running as a PWA on MacOS](/img/articles/file-system-access-api-pwa-macos.png)

      ## What would make the File System Access API even better?

      Naturally, there are always a few things that could be better. At least, in my opinion. I ran into a couple of things while building the demo application. This is the main reason I can recommend trying to build something when learning a new technique. It forces you into real-world problems and find out why they happen and how to fix them.

      ### Get all files in subdirectories in one go

      In the demo application, I want to display all nested files as well. To do this, I had to add a recursive function that would give me them. Luckily, the File System Access API gave me the right tools to do it, but in my opinion, it would be nice if this logic could be included in the API itself. There might be some reasoning behind it which I’m currently unaware of, however. This goes for all these points I’m about to mention.

      ### Only return accepted file formats in a directory

      In my demo application, I am only interested in getting any (nested) Markdown files in the directory I open. It does however return all files, regardless of their file type. Naturally, I could filter those in my recursive function, but this is not ideal for me. I think performance wise this could also be beneficial to add.

      ### Be able to remove a directory with all its contents

      It took me quite a while to understand why the logic to remove a directory didn’t work. The error message didn’t give me much insight as well. As the reference article I used clearly stated that it was possible, I kept at it. It turned out that it does work when the directory is empty. My first thought was that this might have been done to protect the user from accidentally removing an entire directory. Be it due to a malicious web application or a simple mistake. On the other hand, I could just recursively go through all the (nested) handles and remove them. That would trigger the user to give permission every time and therefore provide feedback, though.

      ## Next steps

      The File System Access API is in active development and support for more browsers is needed to use this in production. I’ll keep an eye out for this API and will definitely use it for surprising use cases I will run into.


      If you like to read a bit more about the specifics of the File System Access API, I can recommend [this article](https://developer.chrome.com/articles/file-system-access/) by [Pete LePage](https://twitter.com/petele) and [Thomas Steiner](https://twitter.com/tomayac).


      Finally, try to use the File System Access API yourself. I bet there are quite a few tasks that you need to do often where files are involved. Making this a bit easier through a web application (or PWA) could be quite cool to work on.


      For now, thanks for reading!
    date: 2023-02-03T00:00:00.000Z
    slug: the-file-system-access-api
    tags:
      - front-end
      - pwa
    intro: >-
      An incredibly powerful API exists to access the local file system of a user. Let’s have a look at how this works and why this could be interesting for your next project.
    teaserCopy: >-
      An incredibly powerful API exists to access the local file system of a user. Let’s have a look at how this works and why this could be interesting for your next project.
    teaserImage: /img/articles/file-system-access-api-hero.webp
    title: >-
      The File System Access API: Unlocking New Possibilities for Web Developers
  - type: articles
    body: >-
      Web Workers are a powerful tool in the JavaScript developer’s toolkit, allowing for concurrent execution of JavaScript code. This means that Web Workers can run JavaScript code in the background, independent of the main thread, leading to improved performance and user experience.


      To understand why Web Workers are useful, it’s important to first understand how JavaScript code execution works. Normally, JavaScript code is executed on the main thread, which is responsible for handling user interactions, rendering and updating the page, and other tasks. This means that any JavaScript code that takes a long time to execute can block the main thread, leading to unresponsive pages and poor user experience.


      Web Workers provide a solution to this problem by allowing for the execution of JavaScript code on a separate thread. This means that long-running JavaScript code can be executed in the background, without blocking the main thread. This can lead to improved performance and a better user experience, as the main thread remains responsive and can continue to handle user interactions and other tasks.

      ## How do Web Workers work?

      To use Web Workers, you must first create a new worker by calling the `Worker()` constructor and passing in the URL of the JavaScript file that will be executed on the worker thread. For example:

      ```js

      const worker = new Worker('worker.js')

      ```

      Once the worker is created, you can send messages to and from the worker using the `postMessage()` and `onmessage()` methods, respectively. For example, to send a message to the worker, you can use the following code:

      ```js

      worker.postMessage('Hello from the main thread!')

      ```

      And to receive messages from the worker, you can use the following code:

      ```js

      worker.onmessage = function (e) {
        console.log('Message from the worker:', e.data)
      }

      ```

      This allows for communication between the main thread and the worker thread, allowing for coordination of tasks.


      One key limitation of Web Workers is that they do not have access to the DOM, meaning they cannot directly manipulate the page or access page elements. This means that Web Workers are best suited for tasks that do not require direct interaction with the page, such as data processing or network requests.

      ## How can I practically use this?

      Here is an example of how Web Workers might be implemented, using the code snippets above as a starting point:

      ```js

      // create a new web worker and pass it the path to our worker script

      const worker = new Worker('worker.js')


      // listen for messages from the worker and log the result

      worker.onmessage = function (e) {
        console.log('Worker said: ', e.data)
      }


      // send a message to the worker with some data to perform a computation on

      worker.postMessage([2, 3, 4, 5])

      ```

      ```js
      // listen for incoming messages


      self.onmessage = function (e) {
        // get the data sent from the main thread
        const data = e.data

        // perform a heavy computation on the data
        let result = 0

        for (let i = 0; i < data.length; i++) {
          result += data[i] * data[i]
        }

        // send the result back to the main thread
        self.postMessage(result)
      }

      ```

      In this example, the `script.js` file creates a new Web Worker and passes it the path to the `worker.js` file, which contains the code for the worker. The main thread then listens for messages from the worker and logs the result when it is received.


      The main thread also sends a message to the worker with some data (an array of numbers) to perform a computation on. In this case, the worker performs a simple calculation (squaring each number in the array and adding them together) and then sends the result back to the main thread.

      ## Looking back

      In conclusion, Web Workers are a valuable tool in the JavaScript developer’s toolkit, allowing for concurrent execution of JavaScript code and improved performance and user experience. By offloading heavy computational tasks to worker threads, the main thread remains responsive and able to handle user interactions and other tasks. With their ability to handle data processing and network requests, Web Workers are a useful tool for any developer looking to improve the performance of their web applications.

    date: 2022-12-07T00:00:00.000Z
    slug: web-workers
    tags:
      - front-end
    intro: >-
      Web Workers are a valuable tool for JavaScript developers, allowing for concurrent execution of code and improved performance and user experience. In this blog post, we explore the benefits of Web Workers and provide a practical use case with code examples.
    teaserCopy: >-
      Web Workers are a valuable tool for JavaScript developers, allowing for concurrent execution of code and improved performance and user experience. In this blog post, we explore the benefits of Web Workers and provide a practical use case with code examples.
    teaserImage: /img/articles/web-workers-threads.jpg
    title: Unleash the Power of Web Workers for Blazing Fast JavaScript Execution
  - type: articles
    body: >-
      There’s quite a bit of chatter lately about an experimental hook called `React.use()`. This will fundamentally change the way you work with [React.js](https://reactjs.org/). Let’s have a look at what it is, why you would want to `React.use()` it and how it works!

      ## What is `React.use()`?

      `React.use()` is an experimental hook that offers first-class support for promises and async/await. In essence, it means that you can await asynchronous code in the root of your components.


      Couldn’t you already do that? Nope! Sure you could have promises in React.js for, for instance, data fetching, but you always used something like `useEffect` for this. The component, or rather function that returns some JSX, always just ran. There was no way to pause it to await some asynchronous code. Until now.

      ## Why would I want to `React.use()` this?

      The ability to now await some asynchronous code will for instance have a big impact on how you load data into your component. Previously, you would have to resort to `useEffect` to fetch data. You would then have to add some state where you store the data and potentially show a spinner while the data is being fetched. This could look something like this:

      ```jsx

      import React, { useEffect, useState } from 'react'


      const YourComponent = () => {
        const [isLoading, setIsLoading] = useState(false)
        const [data, setData] = useState([])

        useEffect(() => {
          setIsLoading(true)

          fetch('api.com/data')
            .then((res) => res.json())
            .then((result) => {
              setData(result)
              setIsLoading(false)
            })
        }, [])

        if (isLoading) {
          return 'Loading...'
        }

        if (!data) {
          return 'No data'
        }

        return (
          <ul>
            {data.map((datum) => (
              <li key={datum.id}>{datum.name}</li>
            ))}
          </ul>
        )
      }


      export default YourComponent

      ```

      Note that all the data fetching happens on the client-side. Because of this, the first time the component renders on the client you start fetching data and you need to show some feedback to the user. In this simplified example that is the string ‘Loading…’, but more than likely you display a spinner.


      This isn’t great as the component is rather useless if the data is not fetched yet. So, even though you might have server-side rendering, you won’t really get any benefits. You have to do it this way as you couldn’t run the fetching logic on the server before due to the need of `useEffect`. As the JavaScript function (or often named “component”) is just a function that will run on the server, why can’t I pause that function, fetch the data on the server and then have the first render already use that fetched data on the server? This is why you want `React.use()`.

      ## How do I `React.use()` it?

      You can simply import the `use` hook from the React.js package. Next, you pass it a fetching function, or rather, a Promise. Finally, you assign the response to a variable. The updated example would look a bit like this:

      ```jsx

      import React, { use } from 'react'


      const getData = fetch('api.com/data').then((res) => res.json())


      const YourComponent = () => {
        const data = use(getData)

        if (!data) {
          return 'No data'
        }

        return (
          <ul>
            {data.map((datum) => (
              <li key={datum.id}>{datum.name}</li>
            ))}
          </ul>
        )
      }


      export default YourComponent

      ```

      It looks like a minor change, but let’s see what you gained.


      Firstly, you got rid of the `useEffect` and `useState` hooks. Even better, you got rid of any client-side code! This is now a server component which, when server-side rendering, the function will pause on the server, fetch some data and then return the “filled JSX”.


      Secondly, you simplified the logic. As you don’t need the before-mentioned hooks and callbacks, the code is drastically simplified. Now, this is a simple demo component, but you can imagine more complex components really benefitting from this.


      Finally, you could remove any of the loading state. Because of the `use` hook waited on, the rest of the code will never be executed before it’s done. Of course, you still have to handle the state where there's no data returned from the endpoint, but you can forget about any loading feedback.

      ### So, no more data fetching in the `useEffect` hook?

      Not necessarily, you now have two options which both have their benefits. `use` is great to fetch the data on the server when the component isn’t very useful without the data. Fetching data in a `useEffect` hook is useful when you do want to show the UI while it is fetching the data.

      ## Closing thoughts

      I’m very excited for `React.use()` and the move to server side-first. With frameworks like [Remix](https://remix.run/) and [Next.js](https://nextjs.org/) creating solutions for this problem, it’s good to see a standard coming to React.js that can be utilised by both. It will drastically simplify data fetching and help you create robust server-first components!

    date: 2022-11-22T00:00:00.000Z
    slug: i-want-to-react-use-this
    tags:
      - front-end
      - react-js
    intro: >-
      A big part of working with React.js is fetching data and displaying the results. Let’s see how the new React.use() hook can can help you!
    teaserCopy: >-
      A big part of working with React.js is fetching data and displaying the results. Let’s see how the new React.use() hook can can help you!
    teaserImage: /img/articles/i-want-to-react-use-this-hero.jpg
    title: I want to React.use() this!
  - type: articles
    body: >-
      We’ve all been there. You load some third-party CSS for a date picker and you need to overwrite some CSS to make if fit the visual design language of your project. Suddenly, you’re fighting CSS specificity and slapping an `important!` after every line of CSS. There must be a better way of layering your CSS, right?

      ## What are CSS Cascade Layers?

      You can use CSS Cascade Layers for this. Currently, with any webpage, there are already two CSS Cascade Layers being loaded. Firstly, the browser styles layer is loaded. For instance, buttons in let’s say Chrome already has some styles applied to them. Then, when you add your own CSS, you basically add another CSS Cascade Layer. This layer is more specific than the browser styles layer and your CSS is applied.


      So what if we can add another layer? And another? This can be very useful in the date picker example. If we scope that a bit bigger, we actually need a vendor layer. In this layer, right after the browser layer, we load all vendor styles. Then next, we can load our regular CSS layer. It might look a bit like this:

      ![Image showing three stacked squares as CSS Cascade layers](/img/articles/you-need-css-cascade-layers-layers-example.png)

      This way, you don’t need to combat any vendor styles and have everything needly stacked. This is what CSS Cascade Layers allow you to do.

      ## How do I use it?

      One of the lovely things about CSS (❤️) is that the syntax is usually very simple. You can add a new CSS Cascade Layer like this:

      ```css

      @layer vendor {
        .datepicker {
          /* Your datepicker styles */
        }
      }

      ```

      You first declare a layer with the `@layer` keyword, next you give it a sensible name and finally you can write your CSS. Easy, right?


      You can declare as many layers as you want in the same manner. But, what if you need to add something to this vendor layer? Do you then always need to put everything in this specific piece of your CSS code? You can actually add to this layer similarly to how you normally add extra styles to, let’s say, a class. When you reference this layer again, you can add additional styles:

      ```css

      @layer vendor {
        .datepicker {
          /* More datepicker styles */
        }
      }

      ```

      ### Is the order of declaring these layers important?

      Yes and no. The order you declare these layers is how you can order your stack, but this isn’t always very practical. More often than not, you have multiple CSS (or SCSS) files in your project that get bundled into one CSS file. So how can you make sure that the order of the stack is always the way you want it? You can set a specific order in CSS like this:

      ```css

      @layer normalize, vendor;

      ```

      Simply add a comma-separated list after the `@layer` keyword to set a specific stack order.

      ### Where does your non-layer-appointed CSS fit in all of this?

      Your “regular CSS” is ordered right after the set layers in the stack. Naturally, you can add this to a named layer as well, but there is a catch. CSS that is not in a layer is **always** more specific than any CSS layer. That’s good to keep in mind.

      ## Can you start using this now?

      The browser support at the time of writing is fairly decent, but keep an eye out for some of these browsers that do not support it yet:

      ![Live image of current browser support of CSS Cascade Layers](https://caniuse.bitsofco.de/image/css-cascade-layers.webp)

      ## Closing thoughts

      CSS Cascade Layers are a much-welcome addition to CSS. It will not just help with combatting specificity, but allow you to neatly stack and group your CSS as well. Be sure to try it out and thanks for reading!

    date: 2022-11-15T00:00:00.000Z
    slug: you-need-css-cascade-layers
    tags:
      - front-end
    intro: >-
      Let’s have a look at how you can better structure your CSS layers with CSS Cascade Layers!
    teaserCopy: >-
      Let’s have a look at how you can better structure your CSS layers with CSS Cascade Layers!
    teaserImage: /img/articles/you-need-css-cascade-layers-hero.jpg
    title: You need CSS Cascade Layers
  - type: articles
    body: >-
      Recently quite a few developers, including myself, followed a two-day training course on web security by [Philippe De Ryck](https://pragmaticwebsecurity.com/about.html). This course covered a wide arrange of topics, but one technique, in particular, stood out to me. He showed how you can use Trusted Types in your Content Security Policy (CSP) to protect yourself against cross-site scripting (XSS) attacks. Let’s have a look at what Trusted Types are, why you want to use this technique and how you can use it.

       ## What is XSS?

       Firstly, let’s have a quick look at what XSS is again and how you could easily become vulnerable to this attack. XSS is a vulnerability that allows an attacker to inject malicious code into your website. Let’s look at a basic example of how this works in, for instance, a Single Page Application (SPA) if you don’t protect yourself. Let’s say you are building a comment section for this website ([please do](https://github.com/iodigital-com/io-technology/issues/53)). This website is built using [React.js](reactjs.org) so we’ll use that for the code examples. You might have a component that displays some data that is fetched from an API:

       ```jsx
       import React from 'react'

       const Comments = ({ comments }) => {
         return (
           <ul>
             {comments.map(({ id, content, authorName }) => (
               <li key={id}>
                 <strong>{authorName} wrote: </strong>
                 <span dangerouslySetInnerHTML={{ __html: content }} />
               </li>
             ))}
           </ul>
         )
       }

       export default Comments
       ```

       If you have worked with React.js before, you probably used `dangerouslySetInnerHTML` before. So why do developers use this and why is it dangerous? `dangerouslySetInnerHTML` is used when you need to inject some HTML instead of a string. In this example, the comment was written in a what-you-see-is-what-you-get-editor (WYSIWYG). The editor then creates the HTML of the content and sends that over during the submission of the comment. This HTML “string” is then stored in the database. You as a developer then fetch all the comments and want to render that bit of HTML in the DOM. You don’t want to render the HTML as a string, hence the quotation marks, but want to create the DOM elements out of it. For this `dangerouslySetInnerHTML` is used.

       ### What is so dangerous about setting `innerHTML`?

       Well, not much, **if you know what is being set(!)**. Even then, you are putting a lot of faith in it not being malicious. If you inject HTML that a user has written through a WYSIWYG-editor, you can’t trust it. Ever!

       For instance, a malicious user can add this comment on your article page:

       ```jsx
       Hey,

       Malicious comment here:

       <img src='none' alt='purposely erroring image attack' onerror='window.alert("hello!")'/>
       ```

       Note that most attackers won’t be so nice to let you know the content is malicious. Let’s dissect this attack. The attacker adds an image element that has a `src` of “none”. This `src` will not resolve. Because of that, an error will be thrown. The attacker therefore adds an `onerror` attribute where they can execute JavaScript. In this case, there will be a harmless alert shown, but you can imagine that they can now load whatever JavaScript they want.

       ## How can I protect myself against this attack?

       You can protect yourself from this attack by firstly never trusting any content that you receive to be directly injected into the DOM. You always want to make sure to handle this potentially malicious content accordingly.

       By using `innerHTML`, you’re essentially telling the browser to inject en parse any HTML that you pass. Regardless of what it does. This way, the `onerror` will be added to the image element and you are vulnerable to the attack.

       There are a couple of ways of doing this more safely.

       ### Using safe DOM APIs

       You can make use safe DOM APIs to inject and parse the content. For instance, you could create a paragraph element where you set the `textContent`:

       ```jsx
       const commentParagraph = document.createElement('p')

       commentParagraph.textContent = comment.content

       document.getElementById('comments').appendChild(commentParagraph)
       ```

       By using the `textContent` API, you tell the browser that you have some text content that you want to show. If this content contains malicious code, this will just be added as text content, not as actual code in the DOM.

       ### Using sanitization on the output

       Now, earlier I said that the comment contains HTML that the WYSIWYG editor generated. This HTML code is in fact what we want. It might contain some perfectly fine elements like `ol`, `ul`, `li`, `strong` and so on. So how can you keep the safe HTML, but strip out the parts like the `onerror` attribute on the image?

       You can make use of a package like [DOMPurify](https://github.com/cure53/DOMPurify). This package sanitises the content it is passed with sensible defaults which you can always tweak if you know what you are doing. Let’s go back to the React.js Example and add DOMPurify:

       ```jsx
       import React from 'react'
       import * as DOMPurify from 'dompurify'

       const Comments = ({ comments }) => {
         return (
           <ul>
             {comments.map(({ id, content, authorName }) => (
               <li key={id}>
                 <strong>{authorName} wrote: </strong>
                 <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
               </li>
             ))}
           </ul>
         )
       }

       export default Comments
       ```

       Now when the content is injected and parsed in the DOM, the `onerror` attribute will be stripped. Perfect, problem solved! Or not?

       ### Don’t trust yourself and your fellow developers

       Yes, DOMPurify will sanitise the content and prevent an XSS attack from being executed. There is one big if, however. If you forget this sanitization once, you are vulnerable again. Now, you could add linting rules, code review processes and other attempts to prevent this, but inevitably someone will get passed this (e.g. turn off the linting rule) and you are vulnerable again. Aren’t there better ways?

       ## How can I use CSP to protect myself?

       You can use CSP for quite a few things, but let’s focus on the example at hand. If malicious JavaScript being executed is the real issue, can’t you just block that? You can! I’ve built a demo website to showcase different solutions. Firstly, let’s see what happens when you don’t have any CSP on your page [showcased here](https://www.trusted-type-csp-demo.davebitter.com/).

       ![XSS injection without CSP](/img/articles/developers-are-not-trusted-types-without-csp.png)

       Once you hit the injection button, the following code is executed and the XSS vulnerability is exploited:

       ```jsx
       const elements = {
         injectionForm: document.querySelector('[data-injection-form]'),
         injectionFormInput: document.querySelector('[data-injection-form-input]'),
         injectionFormOutput: document.querySelector('[data-injection-form-output]'),
       }

       const handleSubmit = (e) => {
         e.preventDefault()

         const formData = new FormData(e.currentTarget)
         const input = formData.get('input')

         elements.injectionFormOutput.innerHTML = input
       }

       elements.injectionForm.addEventListener('submit', handleSubmit)
       ```

       ### Adding a basic CSP header

       You can add a basic CSP header that looks like this:

       ```jsx
       <meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
       ```

       Now when you hit the injection button the malicious JavaScript of the `onerror` attribute will not be executed as [showcased here](https://www.trusted-type-csp-demo.davebitter.com/with-csp.html):

       ![XSS injection with CSP](/img/articles/developers-are-not-trusted-types-with-csp-without-dom-purify.png)

       You can see the error thrown by the CSP in the console. To clean this up a bit up you can use DOMPurify to remove the `onerror` attribute just like we did before so you will just see this message if you forgot to sanitise somewhere:

       ![XSS injection with CSP and DOMPurify](/img/articles/developers-are-not-trusted-types-with-csp-and-dom-purify.png)

       Perfect, all done! Right?

       ### Adding a Trusted Types CSP header

       No, you could even take it a step further by adding [the Trusted Types CSP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for). Beware, this is an experimental feature that is driven by Google. The current support is:

       ![Current browser support for Trusted Types image dynamically generated](https://caniuse.bitsofco.de/image/trusted-types.webp)

       First, you add the Trusted Types CSP header:

       ```jsx
       <meta http-equiv="Content-Security-Policy" content="require-trusted-types-for 'script'" />
       ```

       Now when you hit the injection button none of the content is injected and parsed in the DOM:

       ![XSS injection with Trusted Types CSP](/img/articles/developers-are-not-trusted-types-with-csp-trusted-types-and--without-dom-purify.png)

       Next to that, it shows a more detailed error message for you as a developer as to where the `innerHTML` was used to try to inject and parse the content in the DOM.

       Next, you can configure a Trusted Types Policy:

       ```jsx
       if (window.trustedTypes && trustedTypes.createPolicy) {
         trustedTypes.createPolicy('default', {
           createHTML: (string) => string.replace(/\</g, '<').replace(/\>/g, '>'),
         })
       }
       ```

       Note that you have to feature detect whether Trusted Types a supported. This does seem like some manual work where you can easily make some mistakes as defending against XSS can get quite complex. Can’t you just use DOMPurify for this and ask it to both sanitise and give back a Trusted Type. That way you can rely on that package and get the sanitised content to inject and parse in the DOM.

       Let’s revisit the earlier example using DOMPurify and ask for a Trusted Type as well:

       ```jsx
       import React from 'react'
       import * as DOMPurify from 'dompurify'

       const Comments = ({ comments }) => {
         return (
           <ul>
             {comments.map(({ id, content, authorName }) => (
               <li key={id}>
                 <strong>{authorName} wrote: </strong>
                 <span
                   dangerouslySetInnerHTML={{
                     __html: DOMPurify.sanitize(content, { RETURN_TRUSTED_TYPE: true }),
                   }}
                 />
               </li>
             ))}
           </ul>
         )
       }

       export default Comments
       ```

       Now when you hit the injection button the malicious JavaScript of the `onerror` attribute will not be executed and the safe content will be injected and parsed as [showcased here](https://www.trusted-type-csp-demo.davebitter.com/with-csp-and-trusted-type.html):

       ![XSS injection with Trusted Types CSP and DOMPurify](/img/articles/developers-are-not-trusted-types-with-csp-trusted-types-and-dom-purify.png)

       ## Develop with the Trusted Types CSP header set

       One of the great benefits I see is that this is a perfect tool during development as well. Make sure to set the CSP header for Trusted Types during development. This way, even if your content does not have potentially risky attributes like `onerror` which are being injected and parsed in the DOM, you will notice when you don’t use the correct sanitization with a Trusted Type. You will simply not see your content on the screen and get a helpful error message.

       Even with our best intentions as developers, we all make mistakes. XSS being [one of the most common web vulnerabilities on the web](https://www.guru99.com/web-security-vulnerabilities.html) proves that we need to better defend ourselves and our users against this. I’m curious to see where Trusted Types are headed and hope I inspired you to try it out!

       For a more in-depth view into Trusted Types, head over to [the article by Phillip De Ryck](https://auth0.com/blog/securing-spa-with-trusted-types/). To have a look at the demo code for this article, head over to [the repository on GitHub](https://github.com/DaveBitter/csp-trusted-type).

       Thanks for reading and stay safe!
    date: 2022-10-20T00:00:00.000Z
    slug: developers-are-not-trusted-types
    tags:
      - front-end
    intro: >-
      Even with our best intentions as developers, we all make mistakes. XSS being one of the most common web vulnerabilities on the web proves that we need to better defend ourselves and our users against this. Let’s see how Trusted Types can help us!
    teaserCopy: >-
      Even with our best intentions as developers, we all make mistakes. XSS being one of the most common web vulnerabilities on the web proves that we need to better defend ourselves and our users against this. Let’s see how Trusted Types can help us!
    teaserImage: /img/articles/developers-are-not-trusted-types-hero.jpg
    title: Developers are not Trusted Types!
  - type: articles
    body: >-
      This article is part 4 of the series _How do I build a Component Library?_. You can find the demo repository for this series on [GitHub](https://github.com/DaveBitter/fe-monorepo) and the component library itself hosted [here](https://fe-monorepo.davebitter.com/).


      Now that we have our complete setup for our component library, let’s have a look at how we can automate the linting, testing, formatting and publishing of the packages to the private package registry. Next to that, we can host our Storybook for the world to visit.

      ## How do I use GitHub actions to lint pull requests?

      Where you configure your CI/CD is up to where you host your repository or even in a tool like Jenkins. As we are using GitHub for the demo repository and private package registry, it only makes sense to add our CI/CD here as well. To do this, we are going to make use of [GitHub Actions](https://github.com/features/actions). If you are new to GitHub actions, watch my [Friday Tip](https://www.youtube.com/watch?v=qhq0PkxkplE&list=PLsES66lgcKHD9oRnyN3PEvyTjWXJF4IgT) on how to _[update your GitHub README with GitHub actions](https://www.youtube.com/watch?v=jVg-qkQ01lI&list=PLsES66lgcKHD9oRnyN3PEvyTjWXJF4IgT&index=9)._


      At its core, GitHub actions allow you to compose a [YAML](https://yaml.org/) file that consists of various actions and steps. I’ve added a file called `pull-request.yml` in `.github/workflows` that looks like this:


      ```

      name: Pull Request
      on:
        push:
        pull_request:
      jobs:
        pull-request:
          runs-on: ubuntu-18.04
          steps:
            - name: Checkout code
              uses: actions/checkout@v2
            - name: Use Node.js 16.x
              uses: actions/setup-node@v1
              with:
                node-version: 16.x
            - name: Install dependencies
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: install
            - name: Lint packages
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: lint
            - name: Format packages check
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: format:check
            - name: Check package.json files
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: manypkg:check
            - name: Run unit tests
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: test

      ```


      First, give your workflow a sensible name. In this case, as you are going to create a workflow that will run on every pull request, you call it that. Next, you say that on `push` or `pull-request` you want a job to run. Finally, you specify the steps for this job. Here you can checkout the code, install the dependencies and run the linting tasks.


      Now if you make a pull request and push it to the demo repository, it will run these steps:


      ![Screenshot of all steps being executed on GitHub](/img/articles/ci-cd-hosting-pull-request-action.png)


      In the pull request overview, you can see the action being executed as well as a mandatory step before you can merge:


      ![Screenshot of pull request overview where you can see the actions being required to merge](/img/articles/ci-cd-hosting-pull-request.png)


      ## How do I publish to a private package registry?

      Naturally, you want to add another workflow once the pull request is merged to the `master` branch that actually deploys the packages to the private package registry and hosts your Storybook. Let’s add another file in `.github/workflows` that’s called `master-deploy.yml`. First, you give it a sensible name and specify that we just want the workflow to run on a push to the `master` branch and run the same linting tasks as for a pull request:


      ```

      name: Master Deploy
      on:
        push:
          branches:
            - master
      jobs:
        master-deploy:
          runs-on: ubuntu-18.04
          steps:
            - name: Checkout code
              uses: actions/checkout@v2
            - name: Use Node.js 16.x
              uses: actions/setup-node@v1
              with:
                node-version: 16.x
            - name: Install dependencies
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: install
            - name: Lint packages
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: lint
            - name: Format packages
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: format
            - name: Check package.json files
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: manypkg:fix
            - name: Run unit tests
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: test
            ...

      ```


      ### Consuming Changesets

      Next, You want to consume any Changesets in the `.changeset` folder:


      ```

            ...
            - name: Version changeset
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: changeset:version
            ...

      ```


      This will update the versions specified in each package’s `package.json` to the correct new one. You are now ready to start publishing these changes to the private registry

      ### Authenticating

      First, you need to authenticate. As you learned in the first article while setting up the private package registry, you need an `npmrc` file. Naturally, you don’t want to have the actual contents with the token to be commited to your repository. First, add the token you used in the first article as a secret for the repository. Go to the repository settings and navigate to “secrets” and then “actions”. Here you can add a new secret. Add a secret called `ACCESS_TOKEN` and use the token from the first article.


      Next, you can add a step to create a temporary `.npmrc` file that uses that token:


      ```

            ...
            - name: Authenticate with private NPM package
              run: |
                echo @davebitter:registry=https://npm.pkg.github.com/davebitter >> ./.npmrc
                echo //npm.pkg.github.com/:_authToken=${ACCESS_TOKEN} >> ./.npmrc
                echo registry=https://registry.npmjs.org >> ./.npmrc
              env:
                ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
            ...

      ```


      ### Publishing to the private package registry

      Now you can finally publish the updated packages:


      ```

            ...
            - name: Publish changeset
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: changeset:publish
            ...

      ```


      ## How do I host Storybook?

      Naturally, you want to deploy your updated Storybook build as well. There are many different services you can use for this. For the demo repository, I will host the build on [Netlify](https://www.netlify.com/). Remember, it’s all opinionated.

      ### Netlify

      First, create an account and a new site on Netlify. There are [great guides on how to do this](https://docs.netlify.com/welcome/add-new-site/). You can let Netlify connect to your GitHub and automatically configure pipelines, but where’s the fun in that? Let’s manually deploy to Netlify. First, you create a new build of your Storybook:


      ```

            ...
            - name: Create build
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: build
            ...

      ```


      Next, use [nwtgck/actions-netlify@v1.2](https://github.com/nwtgck/actions-netlify) to publish the build:


      ```

            ...
            - name: Deploy to Netlify
              uses: nwtgck/actions-netlify@v1.2
              with:
                publish-dir: './dist'
                production-branch: master
                github-token: ${{ secrets.GITHUB_TOKEN }}
                deploy-message: 'Deploy from GitHub Actions'
                enable-pull-request-comment: false
                enable-commit-comment: true
                overwrites-pull-request-comment: true
              env:
                NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
                NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
              timeout-minutes: 1
            ...

      ```


      Finally, you tell the action where to find the build and under `env` you pass the `NETLIFY_SIDE_ID` of your newly created site on Netlify and pass it the `NETLIFY_AUTH_TOKEN` . You can find more information on how to create that token [here](https://docs.netlify.com/cli/get-started/#obtain-a-token-in-the-netlify-ui). Naturally, you add the tokens as secrets in your repository just like the `ACCESS_TOKEN` to publish to the private package registry.

      ## Committing any updated files

      During the linting process, there might have been changes made to comply with the configurations set. Next to that, the Changeset files are consumed and need to be removed from the repository. For this, you need to commit at the end of the workflow. Luckily, this is rather easy using the _[stefanzweifel/git-auto-commit-action@v4](https://github.com/stefanzweifel/git-auto-commit-action)_ action:


      ```

            ...
            - name: Create commit
              uses: stefanzweifel/git-auto-commit-action@v4
              with:
                file_pattern: packages .changeset
                commit_message: 'chore(ci): commit updated files in workflow'
                commit_options: '--no-verify --signoff'
                branch: master

      ```


      As you can see, any changes in the `package` or `.changeset` folder are commited with a custom commit message.

      ## Putting it all together

      Once all these parts are put together, you end up with a workflow that looks a bit like this:


      ```

      name: Master Deploy
      on:
        push:
          branches:
            - master
      jobs:
        master-deploy:
          runs-on: ubuntu-18.04
          steps:
            - name: Checkout code
              uses: actions/checkout@v2
            - name: Use Node.js 16.x
              uses: actions/setup-node@v1
              with:
                node-version: 16.x
            - name: Install dependencies
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: install
            - name: Lint packages
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: lint
            - name: Format packages
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: format:fix
            - name: Check package.json files
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: manypkg:fix
            - name: Run unit tests
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: test
            - name: Version changeset
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: changeset:version
            - name: Authenticate with private NPM package
              run: |
                echo @davebitter:registry=https://npm.pkg.github.com/davebitter >> ./.npmrc
                echo //npm.pkg.github.com/:_authToken=${ACCESS_TOKEN} >> ./.npmrc
                echo registry=https://registry.npmjs.org >> ./.npmrc
              env:
                ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
            - name: Publish changeset
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: changeset:publish
            - name: Create build
              uses: borales/actions-yarn@v3.0.0
              with:
                cmd: build
            - name: Deploy to Netlify
              uses: nwtgck/actions-netlify@v1.2
              with:
                publish-dir: './dist'
                production-branch: master
                github-token: ${{ secrets.GITHUB_TOKEN }}
                deploy-message: 'Deploy from GitHub Actions'
                enable-pull-request-comment: false
                enable-commit-comment: true
                overwrites-pull-request-comment: true
              env:
                NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
                NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
              timeout-minutes: 1
            - name: Create commit
              uses: stefanzweifel/git-auto-commit-action@v4
              with:
                file_pattern: packages .changeset
                commit_message: 'chore(ci): commit updated files in workflow'
                commit_options: '--no-verify --signoff'
                branch: master

      ```


      Now, for every pull request there is automated linting and testing. After all checks have passed and the pull request is merged, the CI/CD publishes all updated packages and the updated Storybook.

      ## Looking back

      This was the final step for setting up a component library from start to finish. Naturally, there are many more requirements you might run into. A component library is a never-ending living organism. Hopefully, you’ve learned a bit more about how you can approach requirements and can create an awesome component library! Thanks for following along and good luck with your own!

    date: 2022-09-07T00:00:00.000Z
    slug: ci-cd-hosting
    tags:
      - front-end
    intro: >-
      How to build a component library Part 4: Setting up CI/CD & hosting.
    teaserCopy: >-
      How to build a component library Part 4: Setting up CI/CD & hosting.
    teaserImage: /img/articles/ci-cd-hosting-hero.png
    title: How do I setup CI/CD & hosting?
  - type: articles
    body: >-
      This article is part 3 of the series _How do I build a Component Library?_. You can find the demo repository for this series on [GitHub](https://github.com/DaveBitter/fe-monorepo) and the component library itself hosted [here](https://fe-monorepo.davebitter.com/).


      Before adding new components to your component library, you might want to set up some linting and testing tools. This ensures that no unexpected mistakes, inconsistencies and manual labour are required. Let’s have a look at a few tools I think you should always add to your component library. This will not just consist of the the actual tools to run the testing and linting, but surrounding tools to help automate the chores even more and take work off your hands.

      ## How do I set up linting?

      Generally, there are a few must-have linting tools for me in any (front-end) project. Let’s have a look at a few of my favourite ones:

      ### ESLint

      Front-end projects are JavaScript-heavy nowadays. Usually, a better part of the codebase is written in JavaScript (or TypeScript). By far, the most popular tool to lint JavaScript is [ESLint](https://eslint.org/). Setting up ESLint is usually pretty straightforward. Head over to [the docs](https://eslint.org/docs/latest/user-guide/getting-started) to run the setup provided.


      We do however want to add a few things. As we are using TypeScript in this project, we want to update the generated `eslintrc.js` to handle this:

      ```js

      module.exports = {
        env: {
          browser: true,
          es2021: true,
        },
        extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 12,
          sourceType: 'module',
          project: './tsconfig.json',
        },
        plugins: ['prettier'],
        rules: {
          'prettier/prettier': 'error',
        },
        root: true,
      }

      ```


      As you can see, I added the `airbnb-typescipt/base` to the extends array. This will give us some basic linting rules for our project. Next to that, I added the `@typescript-eslint/parser` as the parser value. Finally, in the parser options, I pointed the project to the `tsconfig.json` file. This `tsconfig.json` file looks like this:


      ```json

      {
        "compilerOptions": {
          "target": "ES2022",
          "module": "ES2022",
          "lib": ["ES2022", "dom", "dom.iterable"],
          "outDir": "build",
          "sourceMap": true,
          "strict": true,
          "noUnusedLocals": true,
          "noUnusedParameters": true,
          "noImplicitReturns": true,
          "noFallthroughCasesInSwitch": true,
          "moduleResolution": "node",
          "forceConsistentCasingInFileNames": true,
          "esModuleInterop": true
        },
        "exclude": [],
        "overrides": [
          {
            "files": ["*.ts", "*.tsx"],
            "extends": [
              "plugin:@typescript-eslint/recommended",
              "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],

            "parserOptions": {
              "project": ["./tsconfig.json"] // Specify it only for TypeScript files
            }
          }
        ]
      }

      ```


      This is a fairly basic `tsconfig.json`. Do note that in the overrides array, I added an entry that points to two plugins for ESLint from the `@typescript-eslint` package. For now, this is the main configuration I added to start linting the TypeScript files. I’ve added the following NPM script to the root `package.json`:

      ```

      "lint:ts": "eslint --fix packages/**/*.ts",

      ```


      ### Stylelint

      Naturally, as this project is a component library, we’ll write quite some styling. As you have ESLint for JavaScript, you have Stylelint for CSS/LESS/SASS/Styled Components/[insert framework here]. In our demo repository, we use CSS for now, but the setup is pretty similar across the different frameworks. I’ve added a `.stylelintrc.json` file in the root with the following contents after following the [setup docs](https://stylelint.io/user-guide/get-started):

      ```js

      {
        "extends": "stylelint-config-standard",
        "rules": {
          "selector-class-pattern": null
        }
      }

      ```


      This config is fine for now. I’ve added the following NPM script to the root `package.json`:


      ```

      "lint:css": "stylelint --fix 'packages/**/*.css'"

      ```


      ### Prettier

      Now, we have this linting that will warn us in our IDE. As you may have noticed, I passed for both the `lint:ts` and `lint:css` NPM script the `--fix` parameter. This will try to fix any rules that are breaking. So why not do this and more when you save the file? Luckily, we can use [Prettier](https://prettier.io/) for just that. Prettier can take your existing ESLint and Stylelint configuration to format your code for you. Next to that, you can use Prettier to configure additional automated formatting chores for you. Installing Prettier is pretty straightforward as well. Head over to [the docs](https://prettier.io/docs/en/install.html) to get you started. For the autoformatting on saving, you might need to configure your IDE. For VScode for instance, you can [go here](https://github.com/prettier/prettier-vscode) to see how.


      I’ve added the following NPM script to the root `package.json`:

      ```
      "format:check": "prettier --write \"**/*.{css,ts,js}\"",

      "format:fix": "prettier --write \"**/*.{css,ts,js}\""

      ```


      ### Import sorts

      Another neat automation I like to add to projects is sorting and grouping imports at the top of files. You can use `@trivago/prettier-plugin-sort-imports` to do this for you. Simply install the package and update the `.prettierrc` with your desired configuration:


      ```js

      {
        "useTabs": true,
        "singleQuote": true,
        "trailingComma": "es5",
        "proseWrap": "preserve",
        "printWidth": 100,
        "importOrder": [
          "^lit/?(.*)$",
          "<THIRD_PARTY_MODULES>",
          "^@davebitter/(.*)$",
          "^../(.*)$",
          "^./(?!styles/(.*)$)",
          "^\\./styles/(.*)$"
        ],
        "importOrderSeparation": true,
        "importOrderSortSpecifiers": true
      }

      ```


      As you can see, for the demo repository, I want to have all imports related to Lit be at the top, then have a group with all other third-party modules. After that, I want all the private `node_modules` under the `@davebitter` scope grouped. Next, I want to have all relative imports in a group. Finally, all imports regarding styling should be grouped. After adding this configuration, you never have to worry about your imports again.

      ### Manypkg

      When building a component library as a monorepo, you need to keep internal and external dependencies up-to-date between packages. You could do this manually once in a while, but there is a better way. You can use Manypkg to help you out. In its essence, [Manypkg](https://github.com/Thinkmill/manypkg) is a linter for `package.json` files in Yarn, Bolt or pnpm mono-repos. You can use it to automate these chores. Simply run `yarn add @manypkg/cli` and you can run the following commands in your pre-commit hooks and pipelines:


      `manypkg check` to check whether all `package.json` files are alphabetically sorted, there are internal and external mismatches between packages, there are invalid dev and peer dependency relationships, invalid package names and more. You can have a look at the checks [here](https://github.com/Thinkmill/manypkg#checks).


      `manypkg fix` will run the check and try to automatically resolve the issues it finds. Usually, it’s a wise idea to run this command in your pre-commit hook. That way, your pipeline won’t fail mid-way because of a minor issue.


      I’ve added the following NPM scripts to the root `package.json`:

      ```

      "manypkg:check": "manypkg check",

      "manypkg:fix": "manypkg fix"

      ```


      ## How do I set up unit tests?

      This section can be an article on its own. Setting up testing in your project can get quite complex. Let’s go over a few basic things I set up for the demo repository.

      ### Jest

      Firstly, we need a test runner. By far, one of the most popular ones for JavaScript-based projects is [Jest](https://jestjs.io/). Head over to [their docs to get started](https://jestjs.io/docs/getting-started). I did however add some custom configuration. Firstly, I updated the `jest.config.js` to


      * support our TypeScript-based project

      * use jsdom

      * ignore Lit packages as I had some issues

      * setup another configuration file for `@testing-library` for jsdom

      * stub our CSS imports.


      You can have a look at the configuration file here:


      ```js

      module.exports = {
        preset: 'ts-jest/presets/js-with-babel',
        testEnvironment: 'jsdom',
        transformIgnorePatterns: [
          'node_modules/(?!(testing-library__dom|@open-wc|lit-html|@lit|lit|lit-element|pure-lit|lit-element-state-decoupler)/)',
        ],
        setupFilesAfterEnv: ['<rootDir>/config/tests/testSetup.ts'],
        moduleNameMapper: {
          '^.+\\.(css|less)$': '<rootDir>/config/tests/cssImportStub.ts',
        },
      }

      ```


      Head over to the demo repository to see the contents of the referenced files.


      I then added the following NPM scripts to the root `package.json`:

      ```

      "test": "jest ./packages",

      "test:watch": "yarn test --watch"

      ```


      ### Support for Web Components

      Great, I can run basic tests which are useful for my utility packages, but now we need to add support for the Web Components. Even though Open Web Components has a [specific test runner for this](https://open-wc.org/guides/developing-components/testing/), I want to be able to test my components in Jest using [Testing Library](https://testing-library.com/). Luckily, Open Web Components offers [testing helpers](https://open-wc.org/docs/testing/helpers/) to test your Web Components as well. Simply add the `@open-wc/testing-helpers` package and test your component:


      ```js

      import { fixture } from '@open-wc/testing-helpers'
      import { screen } from 'testing-library__dom'


      import Button from '../Button'


      describe('Button', () => {
        beforeEach(async () => {
          await fixture(Button({ label: 'test', testId: 'test-button' }))
        })


        it('renders passed label in as text in button', () => {
          expect(screen.getByTestId('test-button')).toHaveTextContent('test')
        })
      })

      ```


      ## How do I set up snapshot and visual regression testing?

      As components in a component library often use other components from the same library, you might change something in one component and have it affect multiple other components. It is wise to set up tests to ensure that all changes are spotted and intended. You can do this with snapshot and visual regression testing. Luckily, as we are using Storybook and already documenting many different combinations and configurations of components, we can make use of two great tools for just this.

      ### Storyshots

      Firstly, we can make snapshots of the DOM for every story using [Storyshots](https://storybook.js.org/addons/@storybook/addon-storyshots). With this Storybook addon, we can create a test file called, for example, `storyshots.spec.ts` which looks like this:

      ```js

      import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots'

      import path from 'path'


      initStoryshots({
        suite: 'Storyshots',
        framework: 'web-components',
        test: (story) => {
          const fileName = path.resolve(__dirname, story.story.id)
          return multiSnapshotWithOptions()({
            ...story,
            context: { ...story.context, fileName },
          })
        },
      })

      ```


      When running this test, it will go over all Storybook stories and create a snapshot of the DOM. If something changes, the test will fail. If you pass the flag `-u` when running this test, it will update the locally checked-in snapshots and pass. You can then review these changes (in a merge request). I’ve added the following NPM script to the root `package.json`:


      ```

      "test:regression": "jest /.storybook/storyshots.spec.ts"

      ```


      ### Storyshots

      Its visual counterpart is called [Storyshots](https://storybook.js.org/addons/@storybook/addon-storyshots). Like before, I’ve created a test tile called `imageshots.spec.ts` with the following content:


      ```js

      import initStoryshots from '@storybook/addon-storyshots'

      import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

      import path from 'path'


      initStoryshots({
        suite: 'Imageshots',
        framework: 'web-components',
        test: imageSnapshot({
          storybookUrl: `file://${path.resolve(__dirname, '../storybook-static')}`,
        }),
      })

      ```


      This will do the same as the code snapshots, but using images. This way, you can make sure that any visual changes are correct. I added the following NPM script to the root `package.json`:

      ```

      "test:visual-regression": "jest ./.storybook/imageshots.spec.ts"

      ```


      ## How do I automate the linting and testing?

      Even though you can manually run all these linting and testing scripts, you want to automate this part to help out developers on the project and ensure that the code standard is met. In the next article, we are going to have a look at how to do this in a pipeline, but you don’t want to wait on a pipeline to inform the developer that there is something that needs to be looked at. Much rather, you run your linting and testing before a commit is made. We can do this in a pre-commit hook. To make this easier and smarter, we’ll use [Husky](https://github.com/typicode/husky).


      After installing husky, we update `.hsuky/pre-commit` to run the lint-staged command:


      ```

      #!/usr/bin/env sh
      . "$(dirname -- "$0")/_/husky.sh"


      npx lint-staged

      ```


      ### lint-staged

      Naturally, we only want to lint needed files and not the entire repository if that’s not needed. Using [lint-staged](https://github.com/okonet/lint-staged) in combination with Husky allows you to, for instance, just lint TypeScript files if there are any TypeScript files staged. After installing lint-staged, I updated the `.lintstagedrc` file to the following content:


      ```js

      {
        "packages/**/*.{js,ts}": [
          "eslint --cache",
          "jest ./packages"
        ],
        "packages/**/*.css}": "stylelint --fix",
        "packages/**/*.{js,ts,css,json,md}": "prettier --write",
        "**/package.json": "manypkg check"
      }

      ```


      Now, when we commit, the linting and testing scripts will run.

      ## How do I set a convention for commit messages?

      While we are on the topic of committing, let’s have a quick look at setting a convention for commit messages. Not every developer writes the same way and standards of commit messages.

      ### Commitizen

      You can help developers with this process using [Commitizen](https://github.com/commitizen/cz-cli). In it’s essence, before committing, it will help you construct a commit message with the [Karma commit style](https://karma-runner.github.io/0.8/dev/git-commit-msg.html). After installing, I’ve added the following NPM script to the root `package.json`:


      ```

      "cz": "git cz"

      ```


      This will then guide you through an interactive CLI:


      ![Screenshot of questions the interactive CLI prompts with](/img/articles/linting-testing-commitizen.png)


      ## Looking back

      You've set up quite a bit of tooling for the component library. Linting and testing are done automatically and more automations are added.

      ## Next steps

      That’s already starting to look like a proper setup for the component library repository. In the next article, we’re going to have a look at how we can automate some linting, testing and publishing tasks in a pipeline.

    date: 2022-08-31T00:00:00.000Z
    slug: linting-testing
    tags:
      - front-end
    intro: >-
      How to build a component library Part 3: Setting up linting, unit, snapshot and visual regression testing.
    teaserCopy: >-
      How to build a component library Part 3: Setting up linting, unit, snapshot and visual regression testing.
    teaserImage: /img/articles/linting-testing-hero.png
    title: How do I set up linting, unit, snapshot and visual regression testing?
  - type: articles
    body: >-
      This article is part 2 of the series _How do I build a Component Library?_. You can find the demo repository for this series on [GitHub](https://github.com/DaveBitter/fe-monorepo) and the component library itself hosted [here](https://fe-monorepo.davebitter.com/).


      I’ve already stated that this series would be opinionated. Now, it doesn’t get more opinionated than picking a front-end framework. Which one did I pick and why?

      ## Picking a framework

      There is a plethora of front-end frameworks available to use. Some swear by [React.js](https://reactjs.org/), some put their money on [Vue.js](https://vuejs.org/) while others don’t want to use a framework at all. The internet is full of opinions, comparisons and advice on which to pick. For this series, it doesn’t really matter which one I pick as the setup will most likely be the same. I do however have a strong recommendation based on the past few years working on large projects at large companies.

      ### Why not support all?

      My personal preference for building robust web applications is React.js. React.js has the features, backing and support I’m looking for in a front-end framework. You might, however, be surprised to learn that I don’t actually like React.js to build component libraries.


      The downside with picking a framework like React.js/Vue.js/[Svelte](https://svelte.dev/)/[insert framework here] for a component library is that it’s hard to introduce it in a large company. While a company might use React.js for their newly chosen tech stack, they most likely still have a few [AngularJS](https://angularjs.org/) or vanilla applications that you want to support too. Even if they don’t, in a few years the company might decide to move to the new latest and greatest framework. Migrating your component library to this new framework is very costly and will most likely not happen. Because of this, your component library will most likely be labelled as ‘legacy’. I go more in-depth into this phenomenon in my article [The infinite legacy cycle in front-end](/articles/the-infinite-legacy-cycle-in-front-end).


      So how do you best prevent this from happening? For me, the perfect solutions are [Web Components](https://www.webcomponents.org/). Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps. At least, that’s what [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) says. Simplified, Web Components are browser-native components that offer similar functionality as many front-end framewors. An interesting concept, however, is the usage of the Shadow DOM. To learn more, head over to the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

      ### So native Web Components?

      I mean, you could! It might, however, be wise to look for a bit of an abstraction. There are quite a few front-end frameworks built on Web Components. Go figure, right? Some notable ones are:


      * [Lit](https://github.com/lit/lit)

      * [Stencil](https://stenciljs.com/)


      Like any set of frameworks, they both have their up- and downsides. There are many comparison articles online comparing them. Feel free to look it up after you finish this article. So which one did I choose? I decided to go for Lit. I told you this was going to be an opinionated series. The reason is that I’ve got experience using Lit already. Next to that, I like that it seems to be a bit more low-level and closer to the core which I always look out for. If you want to learn a bit more about Lit, head over to the article [Why lit is 🔥](https://techhub.iodigital.com/articles/why-lit-is-%F0%9F%94%A5) by my colleague Lucien Immink. To be fair, going with any of the mentioned options would be good.

      ### How do Web Components help me?

      As Lit compiles to browser-native Web Components, you can load them in any front-end framework or even vanilla web application. Let’s say you have a button component written as a Web Component. You can now use this button in your React.js application, while also using it in a legacy AngularJS project from years ago. In a year you’re migrating to a fancy new framework? You guessed it, you can load your Web Component in that project.


      This is such an incredibly needed feature for any component library. It ensures that you can roll out your component library company-wide and offers future-proof support.

      ## How do I set up Lit?

      To get started with Lit, head over to their [getting started guide](https://lit.dev/docs/getting-started/) which will help you set it up. To quickly glance over it, however, this is what I did for the demo repository:


      * Install lit: `yarn add lit`

      * Add a Typescript file in one of the packages

      * Start building


      This low footprint is exactly the reason I like Lit so much. Let’s have a look at a standard component from the docs:


      ```js

      import {LitElement, css, html} from 'lit';

      import {customElement, property} from 'lit/decorators.js';


      @customElement('simple-greeting')

      export class SimpleGreeting extends LitElement {
        // Define scoped styles right with your component, in plain CSS
        static styles = css`
          :host {
            color: blue;
          }
        `;

        // Declare reactive properties
        @property()
        name?: string = 'World';

        // Render the UI as a function of component state
        render() {
          return html`<p>Hello, ${this.name}!</p>`;
        }
      }

      ```

      This gives you a basic idea of how to make a simple component. Naturally, you are going to need more functionality (e.g. event handling, lifecycle methods etc.). Please refer to the docs on how to do that with Lit.

      ## Why should I showcase my components (with Storybook)?

      Once you have chosen your front-end framework, you want to be able to view each component during and after development. During development, you need a place to see the actual component you are working on and document different configurations. After development, you want to showcase all the components in different configurations for consumers of your component library. By far, one of the most popular tools to do this is [Storybook](https://storybook.js.org/). Storybook makes it easy to create multiple “stories” for all your components where you can view the result in the browser. Next to that, you can make any properties you can pass to a component editable from the Storybook UI. Finally, there is a vast number of [addons](https://storybook.js.org/addons/) to add to Storybook. Here are a few to give you an idea:


      * [addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) to test for accessibility

      * [storybook-addon-pseudo-states](https://storybook.js.org/addons/storybook-addon-pseudo-states) to show different states like hover, hover and active

      * [storybook-dark-mode](https://storybook.js.org/addons/storybook-dark-mode) to toggle dark-mode for your UI


      There are many more addons so you can pick and choose for your perfect setup.

      ## How do I set up Storybook?

      Storybook has great docs to help you get started. Please head over to [the docs](https://storybook.js.org/docs/react/get-started/introduction) when setting it up for your component library. For the demo repository, I ran `npx storybook init` . This starts an interactive CLI that will take care of most things for you. It asks you for the framework you want to use. As we are using Web Components, I selected that option. This option uses Lit which is a nice bonus.


      Storybook then sets up everything you need to start developing. There are some things I updated, however. Firstly, as we are using a mono-repo setup, you have to tell Storybook where to find the `.stories` files. In `.storybook/main.js` I’ve updated the stories array to look for `.stories` files in the packages folders:


      ```js

      module.exports = {
        stories: [
          './Introduction.stories.mdx',
          '../packages/**/*.stories.mdx',
          '../packages/**/*.stories.@(js|jsx|ts|tsx)',
        ],
        addons: [
          '@storybook/addon-links',
          '@storybook/addon-essentials',
          {
            name: '@storybook/addon-docs',
            options: { transcludeMarkdown: true },
          },
        ],
        staticDirs: ['../public'],
        framework: '@storybook/web-components',
      }

      ```

      Secondly, I’ve updated the root `package.json` with two scripts:

      ```js

      "dev": "start-storybook -p 6006",

      "build": "build-storybook --quiet -o dist",

      ```

      You can now run `yarn dev` to start the development environment of Storybook. You can run `yarn build` to have a production build outputted to the `dist` folder.


      Finally, I like to show the project README file as a separate story which is shown when someone visits the Storybook. Luckily, we can do this quite easily due to the [MDX](https://mdxjs.com/) support. I created `.storybook/Introduction.stories.mdx` and added the following content:

      ```js

      import { Meta } from "@storybook/addon-docs";

      import README from "../README.md";


      <Meta title="README" />


      <README />

      ```

      Now, when we open Storybook, we are greeted with the contents of the README file.

      ## Looking back

      You've set up a front-end framwork to work with and Storybook to develop and showcase your components with.

      ## Next steps

      In the next article, we’re going to use Storybook for quite a bit more. We’re going to use the stories we create to use snapshot and visual regression testing.
    date: 2022-08-24T00:00:00.000Z
    slug: front-end-framework-storybook
    tags:
      - front-end
    intro: >-
      How to build a component library Part 2: Picking a front-end framework and setting up Storybook.
    teaserCopy: >-
      How to build a component library Part 2: Picking a front-end framework and setting up Storybook.
    teaserImage: /img/articles/front-end-framework-storybook-hero.png
    title: How do I pick a front-end framework & showcase it with Storybook?
  - type: articles
    body: >-
      This article is part 1 of the series _How do I build a Component Library?_. You can find the demo repository for this series on [GitHub](https://github.com/DaveBitter/fe-monorepo) and the component library itself hosted [here](https://fe-monorepo.davebitter.com/).


      When building a component library, it is wise to have a solid setup to be able to offer your components to your consumers. Now, this naturally is heavily opinionated. Let’s have a look at how you might do it.

      ## How do I set up a monorepo with Yarn Workspaces?

      My favourite way to separate the code for each component is using a monorepo. This way, you can create separate standalone packages for each of your components. These packages can then be used between one another and it keeps the code nicely scoped.


      There are a variety of packages that can help you with this. I used to use [Lerna](https://github.com/lerna/lerna) a lot, but its future became uncertain a while back. [This issue](https://github.com/lerna/lerna/issues/2703) is an interesting read on that. It has since been taken over by [Nrwl](https://github.com/lerna/lerna/issues/3121), but I have made the shift to [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/).


      Yarn Workspaces allow you to set up multiple packages in such a way that you only need to run `yarn install` once to install all of them in a single pass. So, each package has its own `package.json` and `node_modules`. Yarn Workspaces will then make sure to install the dependencies in each package in your workspace, but also hoist duplicate packages up.

      ### Adding it to your repository

      To turn your repository into a monorepo with Yarn Workspaces, you first have to update the `package.json` file in the root of your repository. First, add `"private": true`. This is a requirement from Yarn. Workspaces are not meant to be published, so they’ve added this safety measure to make sure that nothing can accidentally expose them.


      Next, you need to tell Yarn where your packages will live. For now, let’s set it up so we can have component and utility packages. Add the following to the root `package.json`:

      ```json

      "workspaces": [
          "packages/components/*",
          "packages/utilities/*"
      ],

      ```


      This will tell Yarn that we have our packages in these two folders. Next, let’s add some placeholder packages. Your project structure might look something like this:


      ```

      packages/

      ├── components/

      │   ├── button/

      │   │   ├── src/

      │   │   │   └── index.ts

      │   │   └── package.json

      │   └── text/

      │       ├── src/

      │       │   └── index.ts

      │       └── package.json

      └── utilities/
          └── format-date/
              ├── src/
              │   └── index.ts
              └── package.json
      package.json

      ```


      Each package has its own `package.json` file where it can install its needed dependencies, run custom scripts and more. We’ve also added a temporary source folder with an empty `index.ts` file.


      That’s it! From now on, you can run `yarn install` at the root of the project and Yarn Workspaces will take care of all your dependencies.


      As an extra tip, you might want to take care of keeping all the dependencies in sync. In its essence, [Manypkg](https://github.com/Thinkmill/manypkg) is a linter for `package.json` files in Yarn, Bolt or pnpm mono-repos. You can use it to automate these chores. Simply run `yarn add @manypkg/cli` and you can run commands to help you with keeping your dependencies in sync. Read more about Manypk in my article _[Keeping dependencies in sync in your mono-repo](https://www.davebitter.com/quick-bits/manypkg)._

      ## How do I set up a SemVer strategy?

      As we have all these separate packages that can install each other or be installed in another project, we want to make sure that we version each package correctly. We do this using [SemVer](https://semver.org/). In essence, whenever we make an update to a component, we want to make sure to update the version number in the corresponding package.json with either a patch, minor or major bump.


      This process can be painstaking if you have a large number of package updates. You’d have to:

      * keep track of which packages changed

      * manually bump the version in the package.json correctly

      * write a [changelog](https://www.freecodecamp.org/news/a-beginners-guide-to-git-what-is-a-changelog-and-how-to-generate-it/) file

      * publish the package to a registry


      How can we automate parts of this?

      ### Changesets

      We can make use of [changeset](https://github.com/changesets/changesets) to help us. It provides a CLI tool and a few scripts to do the above. Firstly, add changesets with the following command:


      ```markdown

      yarn add @changesets/cli

      ```


      Next, run the init command:

      ```markdown

      yarn changeset init

      ```


      This creates a `.changeset` folder in the root of your project that looks a bit like this:


      ```

      .changeset/

      ├── config.json

      └── README.md

      ```

      Let’s jump into the `config.json` file. Generally, you can leave it as is. One thing you might want to update is the `baseBranch` value. By default, this is set to “main”. Please update this to whatever your main branch is.


      Great, we can now run a few commands.

      #### Generate a changeset

      `yarn changeset` will open up an interactive CLI tool that assists you in creating a changeset file that can be consumed. First, you select which packages you want to create a changeset for:


      ![CLI interface to make a selection of which package to make a changeset for](/img/articles/monorepo-semver-package-registry-changeset-select-packages.png)


      Next, you have to select the correct SemVer bump:


      ![CLI interface to make a selection of which SemVer to use](/img/articles/monorepo-semver-package-registry-changeset-select-semver.png)


      After that, you can add a summary of the change that will be used in the changelog. Note that it prompts you for a large summary as well if you are doing a major bump:


      ![CLI interface to add a summary for the changes](/img/articles/monorepo-semver-package-registry-changeset-add-summary.png)


      Finally, it gives us a summary of the changeset:


      ![CLI interface with summary of choices](/img/articles/monorepo-semver-package-registry-changeset-summary.png)


      We can now go back to the `.changeset` folder in the root of the project. A new file called `eleven-hounds-prove.md` is automatically generated. Note that the name will change for every generated changeset.


      ```

      ---

      "@davebitter/button": minor

      "@davebitter/text": minor

      "@davebitter/format-date": minor

      ---

      add some info on your changes

      ```


      There is a major benefit of having the markdown file. Firstly, you can review this file in a pull request. Next to that, you can always edit the markdown file later. Finally, you may have noticed that the values are “minor” and not the new version number at the time of generating. This is great for when your changeset will be consumed a while later than generating. You might open a pull request that takes a week to merge. If in the meanwhile somebody updated one of these packages as well, you might run into issues. Changeset makes sure that it will take the version in the package.json of the package and perform the patch, minor or major on that.

      #### Consume a changeset

      Next, we want to consume this changeset file. You can run `yarn changeset version` to execute all changeset files in the `.changeset` folder. After running this, the version property in the package.json of each mentioned package is updated with the correct bump. The changeset file is then removed.

      #### Publish a changeset

      Finally, we want to actually publish the updated packages. You can run `yarn changeset publish` to publish the separate packages to the registry we are setting up next.


      ![CLI interface with publish logs](/img/articles/monorepo-semver-package-registry-changeset-publish.png)


      As you may notice in the image above is that Changeset creates tags for you as well.

      ## How do I publish to a private package registry?

      Next, we want to publish these separate packages to a package registry. This does not have to be a private package registry, but more often than not you want to set this up for the project you work on. There are a variety of package registries to which you can publish. NPM, GitLab, GitHub and more. It depends a bit on your requirements. As this demo repository is hosted on GitHub, let’s set it up for that. Note that the setup for different package registry providers is mostly the same. Just look up a guide for your choice.

      ### Getting access

      Firstly, you need to generate a token on your GitHub. You can do this by going to [https://github.com/settings/tokens](https://github.com/settings/tokens). After hitting generate, make sure to tick the`write:packages`-box


      ![GitHub settings page to create a new access token](/img/articles/monorepo-semver-package-registry-github-token.png)


      Then click “generate token” at the bottom of the page and copy the generated token.

      ### Creating an .npmrc file

      Next, you need to add a `.npmrc` file to the root of your project. Add the following content:


      ```

      @YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com/YOUR_GITHUB_USERNAME

      //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN

      registry=https://registry.npmjs.org

      ```


      Make sure to replace `YOUR_GITHUB_USERNAME` and `YOUR_GITHUB_TOKEN` with your username and token respectively.


      **Don’t commit this file. Update your `.gitignore`**:


      ```

      .npmrc

      ```

      ### Updating the package.json file for each package

      Now, for every package that you want to publish, make sure to add this:


      ```

      "name": "@YOUR_GITHUB_USERNAME/PACKAGE_NAME",

      "repository": "git://github.com/YOUR_GITHUB_USERNAME/REPO_NAME.git",

      ```


      For example, in my setup, this would be:

      ```

      "name": "@davebitter/button",

      "repository": "git://github.com/davebitter/fe-monorepo.git",

      ```


      ### Log in to NPM for your private scope

      Next, as these packages are private, we need to log in to NPM from the terminal with the scope of your GitHub. You can do this by running:

      ```

      npm login --scope=@YOUR_GITHUB_USERNAME --registry=https://npm.pkg.github.com

      ```


      Then, log in to with these credentials:

      ```

      Username: YOUR_GITHUB_USERNAME

      Password: YOUR_GITHUB_TOKEN

      Email (this IS public): YOUR_EMAIL

      ```


      You should see the following message after logging in:

      ```

      Logged in as YOUR_GITHUB_USERNAME on https://registry.npmjs.org/.

      ```


      That’s it, you can now run `yarn changeset publish` and the packages will be published to your private GitHub package registry.

      ## How do I use my packages?

      You can now use the published packages in the monorepo itself. If you want to use your private packages in a different repository, you first have to add a `.npmrc` file in the root of that project that looks like this:

      ```

      //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN

      registry=https://npm.pkg.github.com

      ```


      ## Looking back

      You’ve set up a monorepo that uses Yarn Workspaces to handle dependency management. Next, you use Changeset to help with the versioning of components. Finally, you’ve published the separate packages to your private package registry.

      ## Next steps

      That’s already starting to look like a nice setup. The packages have no real code in there yet. In the next article, we are going to set up our front-end framework and Storybook.

    date: 2022-08-17T00:00:00.000Z
    slug: monorepo-semver-package-registry
    tags:
      - front-end
    intro: >-
      How to build a component library Part 1: Setting up a Monorepo, Semver strategy and Private package registry.
    teaserCopy: >-
      How to build a component library Part 1: Setting up a Monorepo, Semver strategy and Private package registry.
    teaserImage: /img/articles/monorepo-semver-package-registry-hero.png
    title: How do I set up a Monorepo, SemVer strategy and Private package registry?
  - type: articles
    body: >-
      ## The problem

      Let’s imagine that we need want to display an image on our webpage in an aspect ratio of 16 by 9. Now, this would be easy if we have a source image that has the same aspect ratio. But as a developer, you don’t always have control over this. You’ve received the following image:


      ![A single person in frame](/img/articles/face-cropper-single-face.png)


      Luckily, with modern CSS, we can easily make this 16 by 9 with the following to CSS lines:


      ```css

      img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }

      ```


      Once doing this, we see the following result in the browser:


      ![Half a person's face in frame](/img/articles/face-cropper-single-face-cropped.png)


      Oh no! We can’t see the face anymore. This is because by default the [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) is set to `center center` which will center the crop on both the x-axis and the y-axis. No problem, we can just update our CSS to:


      ```css

      img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        object-postion: top center;
      }

      ```


      But wait, now the bottom of the face isn’t visible:


      ![Top half of person's face in frame](/img/articles/face-cropper-single-face-cropped-manually-positioned.png)


      We can ultimately fix the `object-position` by passing pixel or percentage values to get the crop just right. This is however a painstaking process that you would have to do for all your images. Besides that, what if the images can be random and you can’t cover all edge-cases?

      **We need a way to crop and position the crop just right for the face to be in view.**

      ## The Face Detection API to the rescue!

      The Face Detection API, a spinoff of the [Barcode Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API), is at the time of writing only available on Chrome after turning on a feature flag. You can do this by going to `chrome://flags`, searching for `#enable-experimental-web-platform-features` and turning it on.


      ![Chrome settings screen to enable experimental features](/img/articles/face-cropper-chrome-flags-experimental.png)


      Your browser will restart and the Face Detection API will be available


      So what can you do with this API? You can pass an image and it will return you the _bounding box_ of the detected face(s). It will also give you an array of _landmarks_. These _landmarks_ consist of detected eyes, noses and mouths per detected face. Today, we’re just focussing on the actual faces. If we run the API on the previous image, we get this result:


      ```json

      [
        {
          "boundingBox": {
            "x": 230.64181518554688,
            "y": 208.36253356933594,
            "width": 292.52178955078125,
            "height": 292.52178955078125,
            "top": 208.36253356933594,
            "right": 523.1636047363281,
            "bottom": 500.8843231201172,
            "left": 230.64181518554688
          },
          "landmarks": [
            // removed from example
          ]
        }
      ]

      ```


      So, we can now use this data to know where to position our crop, right? Well, that’s what I thought. There is a pitfall. These values are referring to the intrinsic size of the image you pass. In our demo, we scaled down our image. Therefore, these values need to also be scaled down.

      ### Mapping the intrinsically based values to the scaled-down based values

      First, we need to know the width and the height of the intrinsic image. We can do this with the following part of the code:


      ```jsx

      async #getIntrinsicImageNodeSize() {
          const that = this;

          return new Promise((resolve) => {
            var url = this.imageNode.src;
            var img = new Image();
            img.onload = function () {
              const { width, height } = img;

              that.intrinsicImageNodeSize = { width, height };
              resolve();
            };

            img.src = url;
          });
      }

      ```

      Once we have the intrinsic width and height, we can map our face detection bounding box:


      ```jsx

      #getBoundingBoxForFace() {
          const imageNodeBoundingBox = this.imageNode.getBoundingClientRect();

          return {
            top:
              (faceDetectionBoundingBox.top / this.intrinsicImageNodeSize.height) *
              imageNodeBoundingBox.height,
            bottom:
              (faceDetectionBoundingBox.bottom / this.intrinsicImageNodeSize.height) *
              imageNodeBoundingBox.height,
            left:
              (faceDetectionBoundingBox.left / this.intrinsicImageNodeSize.width) *
              imageNodeBoundingBox.width,
            right:
              (faceDetectionBoundingBox.right / this.intrinsicImageNodeSize.width) *
              imageNodeBoundingBox.width,
            width:
              (faceDetectionBoundingBox.width / this.intrinsicImageNodeSize.width) *
              imageNodeBoundingBox.width,
            height:
              (faceDetectionBoundingBox.height / this.intrinsicImageNodeSize.height) *
              imageNodeBoundingBox.height,
          };
      }

      ```


      In essence, what we’re doing is taking the face detection bounding box that is based on the intrinsic size of the image and calculating what the pixel values would be for our scaled-down image. Cool, we now have the following values:


      ```json

      {
        "top": 107.68089590146559,
        "bottom": 258.8549473488978,
        "left": 119.1947456238351,
        "right": 270.36880860493204,
        "width": 151.174062981097,
        "height": 151.1740514474322
      }

      ```


      We can now take these values to, for instance, draw a box on the detected face(s) for easier debugging:


      ![Red squares on the face of the single person in frame](/img/articles/face-cropper-single-face-detection.png)


      If you want to learn more about this API, the Barcode Detection or Text Detection API, you can watch my Friday Tip on _[A first look at the Shape Detection API](https://www.youtube.com/watch?v=ZnSTi3Wbs7g)_. **While you're there, make sure to subscribe!**

      ## Using the face detected bounding box to set the crop position

      Now that we have these values, we can set the `object-position` x and y value to be the top and left of the face detected bounding box. A downside to this, however, is that we need to recalculate these values everytime the image on the page resizes. A smarter way would be to set these value percentage based for both the debugging boxes and the actual `object-position` value. Let's set to percentages for the `object-position` property:


      ```jsx

      #setObjectCrop() {
          const boundingBox = this.#getBoundingBoxForFace();
          const { width: imageNodeWidth, height: imageNodeHeight } =
            this.imageNode.getBoundingClientRect();

          const { top, right } =
            this.#mapFaceDetectionBoundingBoxFromIntrinsicSize(boundingBox);

          const { setObjectFit, setObjectPosition } = this.options;

          if (setObjectPosition) {
            this.imageNode.style.objectPosition = `${Math.floor(
              (right / imageNodeWidth) * 100
            )}% ${Math.floor((top / imageNodeHeight) * 100)}%`;
          }

          if (setObjectFit) {
            this.imageNode.style.objectFit = "cover";
            this.imageNode.style.aspectRatio = "16 / 9";
          }
      }

      ```


      We basically use the top and left values of the face detected bounding box and calculate what percentage those values are based on the height and width of the image respectively. We can now see the smartly cropped face in view:


      ![Cropped face of a single person in frame](/img/articles/face-cropper-single-face-cropped-with-detection.png)


      Great, that seems to work! Whichever image I use, I can be assured that the face will be in view. But what about multiple faces?

      ## Creating a combined bounding box for multiple faces

      Luckily, we can quite easily implement the functionality to get the combined bounding box for the detected faces:


      ```jsx

      #getOuterBoundingBoxFromFaces() {
          const sortedFacesByTop = this.faces.sort(
            (a, b) => b.boundingBox.top - a.boundingBox.top
          );
          const sortedFacesByBottom = this.faces.sort(
            (a, b) => b.boundingBox.top - a.boundingBox.top
          );
          const sortedFacesByLeft = this.faces.sort(
            (a, b) => b.boundingBox.left - a.boundingBox.left
          );
          const sortedFacesByRight = this.faces.sort(
            (a, b) => b.boundingBox.right - a.boundingBox.right
          );

          const top = sortedFacesByTop.at(-1).boundingBox.top;
          const bottom = sortedFacesByBottom.at(0).boundingBox.bottom;
          const left = sortedFacesByLeft.at(-1).boundingBox.left;
          const right = sortedFacesByRight.at(0).boundingBox.right;

          return {
            top,
            bottom,
            left,
            right,
            width: right - left,
            height: bottom - top,
          };
      }

      ```


      Firstly, we get the highest top, lowest bottom, farthest left and farthest right of all the detected faces. We can then easily calculate what the width and height have to be for the combined bounding box.


      ![Sketch of edges of group](/img/articles/face-cropper-combined-bounding-box-sketch.png)


      Then, we use those values to set the value for the `object-position` just like we did earlier. A short demo for this image:


      ![Multiple people in frame](/img/articles/face-cropper-multiple-faces.png)


      Cropping this normally would look like this:



      ![Multiple people in frame with the right person cut off](/img/articles/face-cropper-multiple-faces-cropped.png)



      So we detect all their faces:


      ![Multiple people in frame with a red box on their faces](/img/articles/face-cropper-multiple-faces-detection.png)


      And use the combined bounding box to smartly crop the image:


      ![Multiple people in frame cropped with all their faces visible](/img/articles/face-cropper-multiple-faces-cropped-with-detection.png)


      ## Looking back

      Naturally, we can optimize this demo even further with, for instance, margins for the crop and more. Next to that, this is in no way a production-ready solution due to it just working on Chrome behind a feature flag.


      More important is that this shows just how powerful the browser can be. By combining two techniques, the Face Detection API and the `object` properties combined with the `aspect-ratio` property in CSS, we create an incredibly powerful tool. You can view the demo with the end result with examples [here](http://face-cropper-demo.davebitter.com/). You can view the code of this demo [here](https://github.com/DaveBitter/face-cropper-demo).
    date: 2022-06-29T00:00:00.000Z
    slug: native-face-detection-cropping
    tags:
      - front-end
    intro: >-
      Many online services will help you with cropping an image while keeping face(s) in view. We can however do this just using an (experimental) browser native API. Let’s build it!
    teaserCopy: >-
      Many online services will help you with cropping an image while keeping face(s) in view. We can however do this just using an (experimental) browser native API. Let’s build it!
    teaserImage: /img/articles/face-cropper-teaser.png
    title: Smart cropping with native browser Face Detection
  - type: articles
    body: >-
      * "Yeah, that was written two years ago... We need to rewrite that...”

      * "What were those developers thinking?”

      * "Ah, that's legacy code...”

        * "What? It's not even a few years old!”

      * "Let's write our own, that one is super complex and it's easier to make our own...”


      Then two years later, the same things are said about the new better solutions these developers made. The larger the projects, the more this seems to happen. Naturally, large projects can become quite complex and therefore the solutions can become quite complex. It does feel however that it's more the rule than an exception. Thinking about this, a couple of questions came to mind:

      * Why does this happen so often, so quickly?

      * How quickly does something become "legacy code”?

      * How can we prevent this for our development teams and own code?

      Now, I've got some ideas for my own on these questions, but what does the development world think is the reason for all of this.

      ## Time for research

      I have spoken to people in technology with a variety of skills, experience and roles. Time to find out how they think about these questions, what tips they have to prevent these issues and more.

      ### The startup mentality

      Whether you work at a small startup or a large corporation, there seems to be a common reason why unsustainable solutions are written. Often, the credo is to deliver early, deliver much and keep on getting funding/budget. Especially in front-end development, it's easy to fall into this trap. It's very easy to deliver quickly in front-end development with flashy UI and new features. Almost always this means you have to sacrifice some things. Scalability, documentation and sustainability are some of those things. It's hard to sell these to management who first need to see quick positive results before thinking about long-term consequences. A lot of temporary solutions are made to stay on track with the deadlines.


      ![I'll fix it later... he, in fact, did not fix it later...](/img/articles/fix-it-later.png)

      > Nothing is as permanent as a temporary solution.


      However hard it is, developers need to make time for this. It's naive to think you will get time for this (soon). Developers need to explain, and managers need to understand, that these things are part of building a product that can't be skipped over. If you do, you will create an instant debt that will have an interest.

      ### Relying fully on frameworks in a coupled way

      Front-end development is always mentioned in one breath with frameworks. The rise of frameworks in the past decade(s) has allowed the front-end world to evolve at a rapid pace. Developers can create state of the art user experiences with relatively low effort.


      A downside of these frameworks is that, more often than not, developers write their solutions in a very coupled way. Framework-specific logic is completely intertwined with non-framework-specific logic. This makes it hard to migrate to new (versions of) frameworks. By decoupling this logic into smaller modules you can encapsulate features into standalone features. This makes it easier to refactor small parts of your application without having to do a "big bang refactor”.

      ### ~~Getting~~ Making time

      It's incredibly hard to get time to refactor "legacy code”. There is often a communication gap between developers and their product owners/management. Naturally, it's easier to get time for a fancy new feature than to make "invisible” updates. This communication gap can lead to a lot of frustration. Both "sides” have to work on this, however.


      As a developer, you often fall into the trap of making your case to non-technical people with technical terms. For example, try explaining to a non-technical person that you need to refactor your global state manager to a new framework that makes it easier to persist state client- and serverside. These terms are not difficult for developers to understand, but if you are not a developer, they can sound like a foreign language.


      ![Making your manager fall asleep with technical terms](/img/articles/making-your-manager-fall-asleep.png)


      Instead, try to not just "dumb down” what you are explaining, but ask yourself if you need to explain it at all. A better way of communicating this to your manager is to explain the benefits for the users of their product. We need to use this new technique as it will allow us to remember choices the user made across different pages and moments in time. This way we can personalise the user experience and work on improving the conversion rate. You see, this turns it into an understandable story that clearly shows the business value.


      Both sides need to keep an eye on miscommunication due to technical terms. On the one hand, developers need to work on how they communicate desires, on the other hand, managers need to be vocal when a developer is not making any sense to them and ask for an understandable explanation.

      ### Having a process in place

      A big question is how seriously does your organisation take this? There's no denying that regular updates and refactors are vital to delivering a solid product. However, we do see that often the work and priority of this are heavily underestimated. There needs to be a process in place to ensure this won't get overlooked.


      Luckily, you can automate parts of this. It might be wise to set a standard in your organization and automate audits in your CI/CD to monitor with tools like dependa-bot. This way, problems become visible earlier on, are more tangible and you don't see them a year after your last check.


      Next to this, teams working with Scrum should make this part of their standard sprint. Update early, update often is one of the best things you can do as a team and organization. I've seen it so many times that teams postpone updating their applications to the latest versions of external and internal dependencies. You can postpone this all you want, but you're accumulating debt. This ends up with an update/refactor or rebuild discussion crippling any other work, like new features, that need to be built. You'd be surprised how many "legacy applications” can be prevented to rebuild if there was a process in place to keep them up to date.

      ### Really smart developers will cause issues

      It may seem like a counterintuitive statement, but a major downfall of very smart developers is that they may tend to build rather complex solutions. These solutions may even be unnecessarily complex, difficult to maintain and have no/little tests in place. The problem with these solutions is that, although they might work well and are very impressive, you run into trouble once these developers leave your organization. Suddenly, there are these overly complex solutions that are difficult to fully understand by other developers.


      Naturally, this can be countered with well-written documentation, knowledge transfers and similar solutions, but you will never fully understand how it works as the original developer did. There is an acronym that we like to use called K.I.S.S. (Keep It Simple Stupid). Although this may seem overly obvious, this credo is not followed in a lot of situations. It's actually quite hard to keep your solution simple and easy to understand. The extra time invested in this will be worth it in the long run as developers not using an existing solution because it's they can't grasp what it offers or how it works is such a shame. A new solution, maybe equally as complex, is written and the cycle continues.

      ## Front-end is in its infancy

      ![Two front-end developers walk into a bar. They've got nothing to talk about...](/img/articles/two-front-end-developers-walk-into-a-bar.png)


      I can go on and on about reasons for the _"The infinite legacy cycle in front-end”_ phenomenon, but it comes mostly down to a simple observation. Front-end is in its infancy compared to, for instance, Java and .NET by about 30 years. These platforms went through similar cycles and became more standardised and agreed upon over the years.

      ### We are not really focused on design patterns

      Naturally, we have design patterns in front-end, but we tend to have a lot. Front-end is susceptible to whatever a developer wants to do. Many different opinions on how we should do things. This leads to many discussions and frameworks implementing their own.


      Let's compare this to the back-end landscape. Some patterns are over 60 years old! These patterns work, stood the test of time and are not under debate. How different is that from front-end? Can you imagine us having similar patterns undisputed patterns? This would help greatly with our applications withstanding the test of time past two years.

      ### Frameworks

      Let's take frameworks as an indicator. One of the big reasons for certain front-end applications becoming "legacy” is the vast number of frameworks popping up. Suddenly, the framework you used two years ago isn't considered good enough anymore. Although these framework wars spark innovation, they make the front-end landscape change rapidly. My feeling is that this curve is slowly calming down, but you need to be aware of this when starting new applications. You want to make sure that you don't choose a framework as a developer because it looks like the best solution **now**, but can stand the test of time to a certain degree.

      ### Rendering strategies

      ![Rendering schema from SSR to CSR to SSG to SSR](/img/articles/rendering-schema.png)


      Another example is rendering strategies. Ever noticed we tend to go in circles? We started with rendering all applications server-side. The rise of SPA frameworks moved everything to client-side rendering. This caused issues that we tried to resolve with static site generation. This was cumbersome so one of the latest frameworks, [Remix](https://www.davebitter.com/articles/first-look-at-remix), is moving back to web fundamentals with server-side rendering. The front-end community figuring this out over the past decade has caused an immense rise in "legacy applications”.

      ### We'll get there

      We're still figuring things out. That's fine, tremendous strides are being made to solidify patterns, better the developer and user experience and more. These things take time. It's our job as front-end developers to be cognizant of this and try to not keep jumping to the latest and newest thing right away.

      ## Closing thoughts

      There is no magic way to prevent your applications to become "legacy”. There are however things you can do to mitigate this as much as possible. This is a joint effort between developers and business. Front-end applications are incredibly complex. We need to recognize this and put checks in place to prevent getting stuck in this cycle.

    date: 2022-06-08T00:00:00.000Z
    slug: the-infinite-legacy-cycle-in-front-end
    tags:
      - front-end
    intro: >-
      As a front-end developer and consultant, It seems like many of the existing projects I join have the same issues. Generally, within the first week, you hear one of the following quotes:
    teaserCopy: >-
      Projects often become legacy in an incredibly short time. I have spoken to people in technology with a variety of skills, experience and roles. Time to find out how they think about this, what tips they have to prevent these issues and more.
    teaserImage: /img/articles/interview.jpg
    title: The infinite legacy cycle in front-end
  - type: articles
    body: >-
      Remix spends a single line in the documentation on the [handle export](https://remix.run/docs/en/v1/api/conventions#handle). It simply states:


      *Exporting a handle allows you to create application conventions with the `useMatches()` hook. You can put whatever values you want on it.*


      That’s it, a simple object that you can export on a (nested) route. So why is this such an awesome feature? Well, you can create functionalities like their [meta export feature](https://remix.run/docs/en/v1/api/conventions#meta) and more.

      ## Dave, give me a practical example

      To best explain how this works we’re going to build a breadcrumb-bar that you see on many websites. To do this with the handle export, we’ll first create our pages. We’ll create our page structure like this:


      ```markdown

      .

      └── app
          ├── routes
          │   ├── about.tsx
          │   └── about
          │       ├── us.tsx
          │       └── us
          │           ├── history.tsx
          │           └── values.tsx
          └── root.tsx

      ```


      `root.tsx`, `about.tsx` and `us.tsx` all load the [Outlet component](https://reactrouter.com/docs/en/v6/api#outlet) to load their respective nested routes.


      The next step is to export an object called `handle` from every nested route that looks something like this:


      ```jsx

      // app/routes/about.tsx


      import { NavLink } from 'remix';


      export const handle = {
        breadcrumb: <NavLink to='/about'>About</Navlink>,
        pageTitle: 'About'
      };

      ```


      Note that we can export any value we want. Here, I’m exporting a React component for the breadcrumb itself and a string for the page title.


      So we’ve added this for the about route and all its nested routes. How do we now use it? Well, I want to only load a breadcrumb-bar in one place for all nested routes. We head over to `root.tsx` to do just that. Here, I want to, not just get the data for the current route, but all it’s parents’ data as well. Once I have all these pieces of data, I can start constructing a breadcrumb.


      That single line of documentation on this Remix mentions the `useMatches` hook. This hook returns an array of the currently active route, but all its active parent routes as well. Perfect for our breadcrumb-bar! Let’s have a look at how this translates to code in our `root.tsx`. When we navigate to `/about/us/history`, we get something like this:


      ```jsx

      // app/routes/root.tsx


      import { useMatches } from 'remix';


      export default function App() {
        const matches = useMatches();


        /*
          matches contains an array with this data: [
            { pathname, data, params, handle }, // root route
            { pathname, data, params, handle }, // about route
            { pathname, data, params, handle }, // about/us route
            { pathname, data, params, handle } // about/us/history route
          ];
        */
      };

      ```


      There we can access the object, for every nested route (breadcrumb), we exported as `handle`. Next, we can write some JSX to loop over this list and return the breadcrumb:


      ```jsx

      // app/routes/root.tsx


      import { NavLink, useMatches } from 'remix';


      export default function App() {
        const matches = useMatches();


        return <>
          <nav>
            <ul>
              {matches.map((match, index) => <li key={index}>
                {match.handle?.breadcrumb}
              </li>)}
            </ul>
          </nav>
        </>
      };

      ```


      I’ve created a [CodeSandbox](https://codesandbox.io/s/remix-handle-84nhx) (❤️) where you can see this in action:

       <iframe
        src="https://codesandbox.io/embed/remix-handle-84nhx?fontsize=14&hidenavigation=1&theme=dark"
       style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
       title="remix-handle"
       allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
       sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

      ## So what else can I build with this?

      Well, that depends on your creativity! Remix basically offers a way to keep data at a nested route, but access it higher up in the route in any component you want. You can then render a component or execute logic for every nested route in a single place. What you want to use it for is really up to you. Remix, I believe, uses this to aggregate exported Meta functions and write the meta-tags to the head of the document.


      And that’s all! Let me know what you will use this for. Cheers!
    date: 2022-02-15T00:00:00.000Z
    slug: remix-handle-export
    tags:
      - remix
      - progressive-enhancement
    intro: >-
      There is an awesome feature in Remix that is easily overlooked, but is incredibly powerful! Let’s have a look at the Remix handle export object.
    teaserCopy: >-
      There is an awesome feature in Remix that is easily overlooked, but is incredibly powerful! Let’s have a look at the Remix handle export object.
    teaserImage: /img/articles/remix.jpg
    title: Remix’ powerful hidden feature you might not have noticed yet
  - type: articles
    body: >-
      **New to [Remix](http://remix.run)? Get up to speed by reading my [first look at Remix](https://www.davebitter.com/articles/first-look-at-remix).**

      ## LoaderFunction

      A LoaderFunction is used to fetch and load some data for a (nested) route on the server. Like [Next.js API routes](https://www.davebitter.com/articles/next-js-api-routes), Remix lets you export a special async function that can be used to fetch some data and return an object containing the data. Here is an example of how that may look like when building an overview page for some articles:


      ```

      // app/pages/articles/overview.tsx


      import { LoaderFunction } from 'remix';


      export const loader: LoaderFunction = async ({ }) => {
          const { articles } = await fetch('https://website.com/api/articles').then(res => res.json())

          return {
              articles: articles
                  .splice(0, 5)
                  .map(({ title, slug }: ArticleData) => ({ title, slug }))
          };
      };

      ```

      Note that by naming the exported function `loader`, Remix picks it up. A great optimization you can do right of the box is just returning the data that your front-end needs. In this case, we just need the first five articles’ `title` and `slug` properties. In general, you want to just return the data you actually need for performance and security reasons. The LoaderFunction is the perfect place to do so.


      Next, we want to use this data in the front-end. We export some JSX in the same file where we can access the data form the LoaderFunction by using the `useLoaderData` hook provided by Remix:


      ```

      // app/pages/articles/overview.tsx


      import { LoaderFunction, useLoaderData, Link } from 'remix';


      type LoaderData = {
          articles?: Partial<ArticleData>[];
      };


      export const loader: LoaderFunction = async () => {
          const { articles } = await fetch('https://website.com/api/articles').then(res => res.json())

          return {
              articles: articles
                  .splice(0, 5)
                  .map(({ title, slug }: ArticleData) => ({ title, slug }))
          };
      };


      const OverviewPage = () => {
          const loaderData = useLoaderData<LoaderData | undefined>();

          return <>
              <h1>Articles</h1>

              <ul>
                  {loaderData?.articles?.map(({title, slug}) => {<li key={slug}>
                      <Link to={`/aricles/${slug}`} prefetch='intent'>{title}</Link>
                  </li>})}
              </ul>
          </>;
      }

      export default OverviewPage;

      ```

      And that’s it. Whenever this (nested) route gets requested by the user, the LoaderFunction will fetch some data and then render the JSX on the server. Note that for a nested route, the data request is code-split right out of the box. I enjoy how straightforward it is, but incredibly powerful as well!

      > The web’s core interactivity consists of links and forms. The rest is secondary.

      ## ActionFunction

      So far, Next.js does things in a similar matter. Where Remix, to me, really shines is the handling of forms. In a framework like Next.js, you’d have to create an API route, probably `preventDefault` on the form submit and post client-side to the API route. Remix, being built on web standards, take a great approach to handling forms. It can actually handle your native form submit right out of the box with ActionFunctions like so:


      ```

      // app/pages/contact.tsx


      import { Form, ActionFunction, useActionData, redirect } from 'remix';


      type ActionData = {
          fieldErrors?: {
              name: string | undefined;
              question: string | undefined;
          };
          fields?: {
              name: string;
              question: string;
          };
      };


      export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
          const form = await request.formData();
          const name = form.get('name');
          const question = form.get('question');

          const fieldErrors = {
              name: validateName(name),
              question: validateQuestion(question)
          };

          const fields = { name, question };

          if (Object.values(fieldErrors).some(Boolean)) {
              return { fieldErrors, fields };
          }

          await handleNewContactRequest(fields)

          return redirect(`/contact/thank-you`);
      };


      const ContactPage = () => {
          const actionData = useActionData<ActionData | undefined>();

          return <>
              <h1>Contact</h1>

              <Form method='post'>
                  <label htmlFor='name'>Name</label>
                  <input id='name' name='name' defaultValue={actionData?.fields?.name || ''} required></input>
                  {actionData?.fieldErrors?.name && <span>{actionData?.fieldErrors?.name}</span>}

                  <label htmlFor='question'>Question</label>
                  <input id='question' name='question' defaultValue={actionData?.fields?.question || ''} required></input>
                  {actionData?.fieldErrors?.question && <span>{actionData?.fieldErrors?.question}</span>}

                  <button type='submit'>Send</button>
              </Form>
          </>;
      }


      export default ContactPage;

      ```

      Quite a lot is happening here. Let’s break it up into smaller pieces:


      ```

      // app/pages/contact.tsx


      import { Form } from 'remix';


      <Form method='post'>
          <label htmlFor='name'>Name</label>
          <input id='name' name='name' required></input>

          <label htmlFor='question'>Question</label>
          <input id='question' name='question' required></input>

          <button type='submit'>Send</button>
      </Form>

      ```

      We use the `Form` component by Remix to have client-side form handling if client-side JavaScript is available. If not, it falls back to a regular HTML `form` element. We make sure to properly add the attribute to our `input` elements with the `name` property as we’re going to need that in the form handling. Remember, Remix is built on web standards. We need to add a form method with the value `post` to make it work.


      ```

      // app/pages/contact.tsx


      import { Form, ActionFunction, redirect } from 'remix';


      type ActionData = {
          fieldErrors?: {
              name: string | undefined;
              question: string | undefined;
          };
          fields?: {
              name: string;
              question: string;
          };
      };


      export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
          const form = await request.formData();
          const name = form.get('name');
          const question = form.get('question');

          const fieldErrors = {
              name: validateName(name),
              question: validateQuestion(question)
          };

          const fields = { name, question };

          if (Object.values(fieldErrors).some(Boolean)) {
              return { fieldErrors, fields };
          }

          await handleNewContactRequest(fields)

          return redirect(`/contact/thank-you`);
      };

      ```

      Just like the LoaderFunction, we export a special async function called `action` for the ActionFunction. Because we used a form with the method `post` in this file/route, the function will handle the incoming `post` request automatically.


      We can then do some basic server-side form validation to ensure we don’t send any bad data to our email service. If there is an error for one of the form fields, we return an object containing the error messages. If all is good, we call our email handling service and redirect the user to a thank you page.


      ```

      // app/pages/contact.tsx


      import { Form, useActionData } from 'remix';


      type ActionData = {
          fieldErrors?: {
              name: string | undefined;
              question: string | undefined;
          };
          fields?: {
              name: string;
              question: string;
          };
      };


      const ContactPage = () => {
          const actionData = useActionData<ActionData | undefined>();

          return <>
              <h1>Contact</h1>

              <Form method='post'>
                  <label htmlFor='name'>Name</label>
                  <input id='name' name='name' defaultValue={actionData?.fields?.name || ''} required></input>
                  {actionData?.fieldErrors?.name && <span>{actionData?.fieldErrors?.name}</span>}

                  <label htmlFor='question'>Question</label>
                  <input id='question' name='question' defaultValue={actionData?.fields?.question || ''} required></input>
                  {actionData?.fieldErrors?.question && <span>{actionData?.fieldErrors?.question}</span>}

                  <button type='submit'>Send</button>
              </Form>
          </>;
      }

      ```

      In case there were errors, our ActionFunction behaves like a LoaderFunction where we can access the data that has been returned. Similarly, we use the `useActionData` hook provided by Remix to access the form field errors and entered values. We can then render the form field errors on the page and make sure to set the `defaultValue` property of the `input` elements with the values the user entered.

      > Remix lets you build forms [progressively enhanced](https://www.davebitter.com/articles/custom-inputs-web) without even having to think about it. Writing applications that don’t solely rely on client-side JavaScript has never been easier.

      ## So all this for a no client-side JavaScript?

      Naturally, the visitors of your website will most likely nearly all have client-side JavaScript enabled. There is a common misconception that this is why we want to build websites and web applications without the need of client-side JavaScript. There are a few more major benefits of building with this approach.

      ### Performance

      Firstly, not having to load a large JavaScript bundle on a user’s device and mobile network is a great advantage. As more and more of the web’s functionality is moving to client-side JavaScript, so is the bundle size increasing. Handling all this logic on the server will help greatly with combatting this.

      ### Reliability

      Secondly, having a non-client-side JavaScript “fallback” is great for the reliability and robustness of your web application. What happens when your JavaScript doesn’t load or breaks? In most modern web applications the user won’t be able to complete their task. Having an HTML-only “fallback” available that always works is great to rely on.


      Notice how I keep adding quotation marks around “fallback”. This is because it’s not really a fallback with the Progressive Enhancement mindset. Building with the Graceful Degradation mindset would indeed mean that you first build the full functionality in an ideal situation and then make sure that you can fall back on a solution if that doesn’t work.


      Progressive Enhancement however flips this around. You first build a working solution with just the basics. In this case, a regular HTML form that will post to a server and be redirected or reloaded after the server is done. Then, when there is client-side JavaScript available, we can handle it on the client and enhance the user experience. The great thing about Remix is that you get most of this right out of the box.

      ### Reduced complexity (by moving the state to the server)

      Finally, a big benefit is moving the state to the server. Notice how I never used any client-side state in this form. This not only reduces the risk of a broken application but makes the code far simpler to read and keep up to date.


      Sure, this form will just post the data and be done with it. Imagine you have a form that can create/read/update/delete (CRUD) users. Whenever you modify the user list, you need to make sure that you update all the client-side state that has a copy of the “real” (server-side) state. This can become quite complex and often developers resort to techniques like Redux. This makes an application so much more complex. By doing everything on the server, **Remix will hydrate all the pages every time they load to reflect the latest state of the data**. This is such a powerful shift of responsibility!

      ## Concluding

      Remix makes it incredibly easy to build robust, well-performing and simple web applications by using the “old” web standards with new tricks up its sleeve. I’m a big advocate for how they do this and can’t wait to explore further. For now, thanks for reading and follow me for more of these articles!
    date: 2022-01-07T00:00:00.000Z
    slug: remix-loaderfunction-vs-actionfunction
    tags:
      - remix
      - progressive-enhancement
    intro: >-
      The LoaderFunction and ActionFunction are two core functionalities of working with data in Remix. Let’s have a look at how they work.
    teaserCopy: >-
      The LoaderFunction and ActionFunction are two core functionalities of working with data in Remix. Let’s have a look at how they work.
    teaserImage: /img/articles/remix.jpg
    title: Remix LoaderFunction vs ActionFunction
  - type: articles
    body: >-
      [Remix](https://remix.run) is a full-stack web framework that lets you focus on the user interface and work back through web fundamentals to deliver a fast, slick, and resilient user experience. This is what excited me when I first read about Remix. I'm a big advocate for progressively enhancing web applications and this framework seems to take this approach by simply using web fundamentals.


      This is not a step-by-step guide on how to make a web application with Remix, but rather some features I noticed and wanted to highlight. That might come later. If you are looking for that, [Remix.run](http://Remix.run) is an amazing landing page and contains very well written documentation that will take you through all the reasons why they build this framework, what it offers and how it works. Seriously, one of the best landing pages I've seen in the past few years. Please, have a read there and come back for my view as a [Next.js](https://nextjs.org/) fanboy.

      ## Routing mechanism

      Like Next.js, Remix uses a file-based routing system. In `/app` (where your app will live) you can create a folder called `routes`. Every file you add (e.g. `/app/routes/example` will create a route and page under `http://website.com/example`. If you're unfamiliar with this concept, please read my article [A simple, yet detailed introduction to Next.js](https://www.davebitter.com/articles/a-simple-yet-detailled-introduction-to-next-js). Next.js and Remix work nearly the same with some exceptions like creating a dynamic page (`[slug]` vs. `$slug`. If this is not the way you want to work, you can also define your routes in an object for both of these frameworks.

      ### Nested routes

      Remix seems to heavily rely on the usage of nested routes as "partials". Let's say you are building an admin view. You might have multiple routes for several admin pages:

      ```

      - app
          - routes
              - admin.tsx
              - admin
                  - new.tsx
                  - edit.tsx
                      $user.tsx

      ```

      All these admin pages might share a special navigation bar for logged in admins. Naturally, you could load a reusable component in the markup of all these pages, but that sounds more like a partial that you used to use back when building websites with templating languages like Pug or Handlebars. Remix allows you to just load the partial in `app/routes/admin.tsx` and add a Remix component called `<Outlet />` . This component serves as a placeholder where a child route can be rendered. In this case, that would be the new and edit route. I really like this approach of templating out pages.

      ### Scoped JS and CSS per nested route

      These nested routes are not just useful as partials, but will allow Remix to also easily chunck-up your nested routes for JS and CSS bundles. Naturally, it knows what pieces to load as you load them per nested route. This makes these nested routes true small little routes and optimises the loading of resources.


      This concept is fundamental to how Remix works. You can read more about nested routes [here](https://remix.run/docs/en/v1/guides/routing) and CSS scoping with `<Links />` [here](https://remix.run/docs/en/v1/guides/styling).

      ## Server- and client-side code

      We've seen great strides by Next.js to make it easy for developers to expose server-side functions right next to client-side code. You can read more about that in my article [Next.js page generation](https://www.davebitter.com/articles/next-js-page-generation). At a first glance, Remix has an evenly convenient, if not better solution. I feel like Remix takes it to the next level by fully focussing on not having to use client-side JS as a standard, but rather an afterthought.

      ### Loaders

      Many web applications need to fetch data. You can use `loader` functions in combination with a `useLoaderData` hook to set this up.

      ```jsx

      import type { LoaderFunction } from "remix";

      import type { User } from "@prisma/client";

      import { db } from "~/utils/db.server";


      type LoaderData = { users: Array<User> };

      export let loader: LoaderFunction = async () => {
        const data: LoaderData = {
          users: await db.user.findMany()
        };

        return { data };
      };


      export default function Users() {
        const data = useLoaderData<LoaderData>();

        return (
          <ul>
            {data.map(user => (
              <li>{user.name}</li>
            ))}
          </ul>
        );
      }

      ```

      There is quite some Typescript-specific code here, but in its essence there is an async function exported called `loader`. This function fetches some data and returns an object with data. Note that you can return multiple pieces of data from various sources here. You can now access all this data using the `useLoaderData` hook. An important aspect of this is that no client-side JS is needed here. You just want some data from your server-side function and then use it to render a list on the server to serve to the client.

      ### Actions

      So what about handling things like forms? I need to handle that on the client right? Well, not necessarily. Forms can easily be handled with a `method` attribute on the form element. Sure, you might want to make a fancy multi-step form, but this is where progressive enhancement pops up again. Just make a form with a `method` and let it post using the web standards. You then export an `action` function that will handle the posting of the form. Take a look at this code snippet of the [Jokes app tutorial](https://remix.run/docs/en/v1/tutorials/jokes) I followed in preparation for this article. You can find my full end result in [this repository](https://github.com/DaveBitter/remix-jokes).

      ```jsx

      import type { ActionFunction } from "remix";

      import { redirect } from "remix";

      import { db } from "~/utils/db.server";


      export const action: ActionFunction = async ({
        request
      }) => {
        const form = await request.formData();
        const name = form.get("name");
        const content = form.get("content");
        // we do this type check to be extra sure and to make TypeScript happy
        // we'll explore validation next!
        if (
          typeof name !== "string" ||
          typeof content !== "string"
        ) {
          throw new Error(`Form not submitted correctly.`);
        }


        const fields = { name, content };


        const joke = await db.joke.create({ data: fields });
        return redirect(`/jokes/${joke.id}`);
      };


      export default function NewJokeRoute() {
        return (
          <div>
            <p>Add your own hilarious joke</p>
            <form method="post">
              <div>
                <label>
                  Name: <input type="text" name="name" />
                </label>
              </div>
              <div>
                <label>
                  Content: <textarea name="content" />
                </label>
              </div>
              <div>
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
        );
      }

      ```

      There is a basic form (with no client-side JS) that just posts on submit. The `action` function is then called where we can then get the form data and handle it like normal. But what about validation? Naturally, you want to do this on the server, but it's considered good practice to do this on the client as well. The nice thing about having everything in this file is that we can reuse the same validation function in both places. Here's another snippet with just server-side validation implemented.

      ```jsx

      import type { ActionFunction, LoaderFunction } from "remix";

      import {
          useActionData,
          redirect,
          Form
      } from "remix";

      import { JokeDisplay } from "~/components/joke";

      import { db } from "~/utils/db.server";

      import {
          requireUserId,
          getUserId
      } from "~/utils/session.server";


      export const loader: LoaderFunction = async ({
          request
      }) => {
          const userId = await getUserId(request);
          if (!userId) {
              throw new Response("Unauthorized", { status: 401 });
          }
          return {};
      };


      function validateJokeContent(content: string) {
          if (content.length < 10) {
              return `That joke is too short`;
          }
      }


      function validateJokeName(name: string) {
          if (name.length < 2) {
              return `That joke's name is too short`;
          }
      }


      type ActionData = {
          formError?: string;
          fieldErrors?: {
              name: string | undefined;
              content: string | undefined;
          };
          fields?: {
              name: string;
              content: string;
          };
      };


      export const action: ActionFunction = async ({
          request
      }): Promise<Response | ActionData> => {
          const userId = await requireUserId(request);
          const form = await request.formData();
          const name = form.get("name");
          const content = form.get("content");
          if (
              typeof name !== "string" ||
              typeof content !== "string"
          ) {
              return { formError: `Form not submitted correctly.` };
          }


          const fieldErrors = {
              name: validateJokeName(name),
              content: validateJokeContent(content)
          };
          const fields = { name, content };
          if (Object.values(fieldErrors).some(Boolean)) {
              return { fieldErrors, fields };
          }


          const joke = await db.joke.create({
              data: { ...fields, jokesterId: userId }
          });
          return redirect(`/jokes/${joke.id}`);
      };


      export default function NewJokeRoute() {
          const actionData = useActionData<
              ActionData | undefined
          >();


          return (
              <div>
                  <p>Add your own hilarious joke</p>
                  <Form method="post">
                      <div>
                          <label>
                              Name:{" "}
                              <input
                                  type="text"
                                  defaultValue={actionData?.fields?.name}
                                  name="name"
                                  aria-invalid={
                                      Boolean(actionData?.fieldErrors?.name) ||
                                      undefined
                                  }
                                  aria-describedby={
                                      actionData?.fieldErrors?.name
                                          ? "name-error"
                                          : undefined
                                  }
                              />
                          </label>
                          {actionData?.fieldErrors?.name ? (
                              <p
                                  className="form-validation-error"
                                  role="alert"
                                  id="name-error"
                              >
                                  {actionData.fieldErrors.name}
                              </p>
                          ) : null}
                      </div>
                      <div>
                          <label>
                              Content:{" "}
                              <textarea
                                  defaultValue={actionData?.fields?.content}
                                  name="content"
                                  aria-invalid={
                                      Boolean(actionData?.fieldErrors?.content) ||
                                      undefined
                                  }
                                  aria-describedby={
                                      actionData?.fieldErrors?.content
                                          ? "content-error"
                                          : undefined
                                  }
                              />
                          </label>
                          {actionData?.fieldErrors?.content ? (
                              <p
                                  className="form-validation-error"
                                  role="alert"
                                  id="content-error"
                              >
                                  {actionData.fieldErrors.content}
                              </p>
                          ) : null}
                      </div>
                      <div>
                          <button type="submit" className="button">
                              Add
                          </button>
                      </div>
                  </Form>
              </div>
          );
      }

      ```

      Note that we return the validation messages if there is something wrong and render the page again accessing them with the `useActionData` hook. If the form validates fine, we can redirect to the overview page.

      > This is a great example of how easy it can be to create an interactive part of your web application without the need for client-side JS for something that has web standards. Sure you can, but Remix is built in a way where you take this approach first.


      ## Resource routes

      If I would've build the previous form without any client-side JS in Next.js, I would've had to build a Next.js API route. These are incredibly powerful. You can read more about these API routes in my article [Next.js API routes](https://www.davebitter.com/articles/next-js-api-routes). With Remix, you can do exactly the same, but even more. Remix doesn't just offer this for, for instance, JSON responses, but for any kind of response really. You can create a file with a special naming pattern like `/app/routes/jokes[.]rss.tsx`. The `[.]rss` part tells Remix that you will return a `.rss` file. In this code snippet, you can see how something like this could work.

      ```jsx

      import type { LoaderFunction } from "remix";

      import { db } from "~/utils/db.server";


      export const loader: LoaderFunction = async ({
          request
      }) => {
          const jokes = await db.joke.findMany({
              take: 100,
              orderBy: { createdAt: "desc" },
              include: { jokester: { select: { username: true } } }
          });


          const host =
              request.headers.get("X-Forwarded-Host") ??
              request.headers.get("host");
          if (!host) {
              throw new Error("Could not determine domain URL.");
          }
          const protocol = host.includes("localhost")
              ? "http"
              : "https";
          const domain = `${protocol}://${host}`;
          const jokesUrl = `${domain}/jokes`;


          const rssString = `
          <rss xmlns:blogChannel="${jokesUrl}" version="2.0">
            <channel>
              <title>Remix Jokes</title>
              <link>${jokesUrl}</link>
              <description>Some funny jokes</description>
              <language>en-us</language>
              <generator>Kody the Koala</generator>
              <ttl>40</ttl>
              ${jokes
                  .map(joke =>
                      `
                  <item>
                    <title>${joke.name}</title>
                    <description>A funny joke called ${joke.name}</description>
                    <author>${joke.jokester.username}</author>
                    <pubDate>${joke.createdAt}</pubDate>
                    <link>${jokesUrl}/${joke.id}</link>
                    <guid>${jokesUrl}/${joke.id}</guid>
                  </item>
                `.trim()
                  )
                  .join("\n")}
            </channel>
          </rss>
        `.trim();


          return new Response(rssString, {
              headers: {
                  "Cache-Control": `public, max-age=${60 * 10
                      }, s-maxage=${60 * 60 * 24}`,
                  "Content-Type": "application/xml",
                  "Content-Length": String(Buffer.byteLength(rssString))
              }
          });
      };

      ```

      How cool is that! The routes folder is not just for HTML pages, but you can create routes for any resource you need, hence the name resource routes.

      ## Nested route utility exports

      I found the utility exports that Remix offers on nested routes incredibly nice to use. Previously, I mentioned you could import CSS on nested routes and have it scoped and chuncked to just that nested route. There are a variety of other Remix utilities you can use scoped to a nested route.

      ### SEO

      You probably want to add some meta-tags to your pages. You can do this easily by exporting a `MetaFunction` on (nested) routes. Let's say you have some basic meta-tags on the root of the pages under `app/root.tsx`. You can export that function there like so:

      ```jsx
      export const meta: MetaFunction = () => {

        const description = `Learn Remix and laugh at the same time!`;
        return {
          description,
          keywords: "Remix,jokes",
          "twitter:image": "https://remix-jokes.lol/social.png",
          "twitter:card": "summary_large_image",
          "twitter:creator": "@remix_run",
          "twitter:site": "@remix_run",
          "twitter:title": "Remix Jokes",
          "twitter:description": description
        };
      };

      ```

      But you might want to update the title or description for a specific nested route. You guessed it, you can export the same function with different values there to extend this base set of meta tags. I think that's pretty sweet.

      ### Error handling

      You can export a `CatchBoundary` and `ErrorBoundary` function for every (nested) route.

      ```jsx

      export function CatchBoundary() {
          const caught = useCatch();


          if (caught.status === 404) {
              return (
                  <div className="error-container">
                      There are no jokes to display.
                  </div>
              );
          }
          throw new Error(
              `Unexpected caught response with status: ${caught.status}`
          );
      }


      export function ErrorBoundary() {
          return (
              <div className="error-container">
                  I did a whoopsies.
              </div>
          );
      }

      ```

      This will help you with two things. You can notify the user with some custom message on the page, but more importantly, you can isolate this error to just the nested route. The rest of you're application will run fine. This helps you think about how you want to handle your not so optimal flow.

      ## Finally, loading some client-side JS for the first time

      During the Jokes app tutorial, I didn't even realize that hadn't written any client-side JS yet. I think it's really cool that Remix doesn't load any client-side JS by default. Naturally, you might need some client-side JS so you can load the `<Scripts />` component. This is the first time you will see JS files in your network tab. These optimised and chuncked files will be loaded and "hydrate" your application on the client.

      ## Verdict.

      I'm a big advocate of Progressive Enhancement to make web applications simple, accessible and resilient. You can read some of my articles on this [here](https://www.davebitter.com/tags/progressive-enhancement). I usually put this to practice for just components. Seeing Remix take this approach to the entire application gives me hope for a future of building great web applications using web standards and progressive enhancement.


      For the first time in years, I felt like a "web developer" again instead of a JS engineer. It's incredible fun to start thinking about how to leverage these standards smartly. I'm very excited about what Remix will offer and will definitely continue researching Remix and sharing it with all of you. Thanks for reading!
    date: 2021-12-08T00:00:00.000Z
    slug: first-look-at-remix
    tags:
      - remix
      - progressive-enhancement
      - seo
      - serverless
    intro: >-
      There has been a lot of buzz around the open-source release of Remix. I took a first look by following the deep-dive tutorial and this is what I found.
    teaserCopy: >-
      There has been a lot of buzz around the open-source release of Remix. I took a first look by following the deep-dive tutorial and this is what I found.
    teaserImage: /img/articles/remix.jpg
    title: First look at Remix
  - type: articles
    body: >-
      ## Why should I use this at all?

      Internationalisation is hard. There are many ways different countries handle the formatting of numbers, currencies and dates. In Dutch, we write `DD/MM/YYYY` while in English you’d write `MM/DD/YYYY`. That’s a pretty well-known one, but do you know how we format large numbers with decimals in Dutch compared to English? In Dutch we use `100.000,11` while in English you’d write `100,000.11`. These might be familiar to you but what about French? In French, you’d write `100 000,11`. There are even more differences if we look at currencies. In Dutch, you’d write `€ 100.000,11` while in German you’d write `100.000,11 €` This is where it becomes difficult to write your own formatting functions. You’d not only have to know about these differences but would have to extend your formatting functions for every language that you’re going to support.

      ## There is a library for that!

      In the past, this would be the solution. If we look at just dates, libraries like Moment.js and date-fns have been around for a long time. Although this does the trick, it comes at a hefty price. Let’s say you just want to format some dates. Moment.js would cost you a lot of KB’s in your bundle. If you visit [Moment.JS’s website](https://momentjs.com/), you see that they actually discourage you to use their library and use the default Intl browser API instead.


      > We now generally consider Moment to be a legacy project in maintenance mode. It is not dead, but it is indeed done.


      This is not something to be sad about, it’s great news! Years ago Moment.js filled the gap for this need of developers that wasn’t met with a default browser API. Luckily, we do have that now.

      ## So what does Intl offer?

      Intl offers a standard for formatting build in the browser for two main categories. Firstly we can format dates easily with `Intl.DateTimeFormat` and `Intl.RelativeTimeFormat` for regular and relative dates. Secondly, we can format numbers with `Intl.NumberFormat` for numbers and currencies. These three methods most likely satisfy the majority of your formatting needs.

      ### DateTimeFormat and RelativeTimeFormat

      The `DateTimeFormat` method consists of three parts. The locale, formatting options and date.

      ```js

      new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: '2-digit' }).format(new Date());

      // outputs: "August 4, 21"


      new Intl.DateTimeFormat('nl', { day: 'numeric', month: 'long', year: '2-digit' }).format(new Date());

      // outputs: "4 augustus 21"


      ```

      You can see that it will not just put the day, month and year in the correct order, but also handle the translation of the name of the month. Naturally, there is a wide range of formatting options to be used which you could check out over at the documentation.

      One of the cool things in Moment.js was the ability for relative dates. You can do this to with Intl by using `Intl.RelativeTimeFormat`.

      ```js

      new Intl.RelativeTimeFormat('en').format(-1, 'day');

      // outputs: "1 day ago"


      new Intl.RelativeTimeFormat('en').format(-2, 'day');

      // outputs: "2 days ago"


      new Intl.RelativeTimeFormat('nl').format(-1, 'day');

      // outputs: "1 dag geleden"


      new Intl.RelativeTimeFormat('nl').format(-2, 'day');

      // outputs: "2 dagen geleden"


      ```

      You can see that it handles the pluralisation and translation for you. This is great while working with many languages. You can check out the documentation for more examples of what you can do.

      ## NumberFormat

      The `NumberFormat` method consist of three parts as well. The locale, formatting options and number.

      ```js

      new Intl.NumberFormat('en', {}).format(number)

      // outputs: "100,000.11"


      new Intl.NumberFormat('nl', {}).format(number)

      // outputs: "100.000,11"


      ```

      Next to this, you can format the number as a currency by passing the following formatting options:

      ```js

      new Intl.NumberFormat('en', { style: 'currency', currency: 'GBP' }).format(number)

      // outputs: "£100,000.11"


      new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(number)

      // outputs: "€100,000.11"


      new Intl.NumberFormat('nl', { style: 'currency', currency: 'EUR' }).format(number)

      // outputs: "€ 100.000,11"


      new Intl.NumberFormat('de', { style: 'currency', currency: 'EUR' }).format(number)

      // outputs: "100.000,11 €"


      ```

      As you can see, there are quite a few differences between locales. You can also mix and match locales and currencies to, for instance, get euro's in English number formatting.

      ## That's awesome!

      Right!? This standardised way of formatting numbers, currencies and dates makes it a breeze to always display the correct value to users based on their locale. We don't need to load any libraries that will increase our bundle size because Intl lives right in the browser. I encourage you to try it out and use it in your (next) projects. If you'd like to see some examples you can watch my Friday tips on Intl [here](https://www.davebitter.com/friday-tips/intl) and visit the docs over at MDN. Thanks for reading!
    date: 2021-08-04T00:00:00.000Z
    slug: you-should-use-intl
    tags:
      - es6
      - api
    intro: >-
      If you have worked with internationalisation in a project you know what a hassle it can be. Besides the regular content, you have to worry about the formatting of numbers, currencies and dates. In this article, we’ll go over how we can make this easier with Intl.
    teaserCopy: >-
      If you have worked with internationalisation in a project you know what a hassle it can be. Besides the regular content, you have to worry about the formatting of numbers, currencies and dates. In this article, we’ll go over how we can make this easier with Intl.
    teaserImage: /img/articles/internationalisation.jpg
    title: You should use the Intl browser API
  - type: articles
    body: >-
      ## Next.js ❤️ DX

      Next.js is already an amazing experience for developers. It was by no means a sluggish experience. With Next.js 10, startup times were improved up to 24% and processing times were decreased by 40%.


      But why stop there? Next.js 11 now includes another optimization to Babel to further reduce the startup time. A brand new implementation of the Babel loader for Webpack, optimizing loading and adding an in-memory config caching layer is added. In practice, this means no change for developers but will ultimately mean a faster development experience.

      ## Next.js Live (Preview Release)

      A very exciting new feature for team collaboration is Next.js Live. By leveraging tools like ServiceWorker, WebAssembly, and ES Modules, Next.js manages to put the entire development process in the browser. In practice, this means that developers can share a URL with their team and live view, discuss and edit the application right in the browser. Even more impressive is that it needs no build step for this, making it blazingly fast!


      At the moment this feature is in preview release. Learn more about Next.js Live and how you can pair it with Vercel's real-time collaboration engine [over at Vercel]([https://nextjs.org/live](https://nextjs.org/live)).

      ## Image placeholders

      Before, you had to define the height and width of a local image that you load in this component. From now on, Next.js automatically detects these sizes so you don't have to.


      You can now use blurred placeholder images while your actual image loads. You can do this by adding `placeholder="blur"` to your Image component. Next.js also supports blurring dynamic images by allowing you to provide a custom `blurDataURL`, which is provided by your backend. For example, you can generate a [blurha.sh](http://blurha.sh/) on the server.

      ## External script loading

      Loading external scripts happens a lot. Whether you need to load Google Analytics, a helpdesk service or others. Developers can now prioritize script loading with the new `strategy` property on the Script component. You can set one of three strategies:


      * `beforeInteractive`: For critical scripts that need to be fetched and executed **before** the page is interactive, such as bot detection and consent management. These scripts are injected into the initial HTML from the server and run before self-bundled JavaScript is executed.

      * `afterInteractive` (**default**): For scripts that can fetch and execute **after** the page is interactive, such as tag managers and analytics. These scripts are injected on the client-side and will run after hydration.

      * `lazyOnload` For scripts that can wait to load during idle time, such as chat support and social media widgets.


      Finally, the default script loading is changed from preloading and `async` to `defer`. By adding this new `strategy` property, developers have better fine-grained control in loading behaviour.

      ## Conformance

      Developers are often asked to become experts in UX quality topics like performance, security and accessibility. Google, by leveraging a system of strong defaults and safeguards, empower developers to focus more on features and products. With the release of Next.js 11, Google's Web Platforms team has begun open-sourcing their system with Conformance for Next.js.


      Conformance is a system that provides carefully crafted solutions and rules to support optimal loading and Core Web Vitals, with further additions coming to support other quality aspects like security and accessibility. These solutions free your team from memorizing all the latest rules for optimal loading performance, while still giving you the flexibility to make the right choices for your applications.


      Next.js 11 now supports ESLint out of the box to make it easier to catch framework-specific issues during development and set guidelines for your team to ensure best practices even as you scale. For new Next.js 11 applications this is used by default. For existing applications, that upgrade to this new version, you can run `next lint` to get started.

      ## Other bits and pieces

      ### Webpack 5 out of the box

      Webpack 5 could already be turned on in Next.js 10, but starting with Next.js 11 it will be used by default. From experience, I can say that moving over to Webpack 5 with Next.js was a breeze, so don't let it scare you off to upgrade to the latest Next.js major version.

      ### Create React App (CRA) migration tool

      Although migrating from CRA to Next.js was surprisingly easy, it can always be improved. To make it even easier to migrate your existing CRA apps, you can now use this tool with the following command: `npx @next/codemod cra-to-next`


      The transform automatically adds a pages/ directory and moves CSS imports to the right location. It'll also enable a CRA compatibility mode in Next.js that ensures some patterns used in Create React App work with Next.js. This allows for incremental adoption which is great for large projects.

      ## Try it out!

      You can head over to [Next.js]([https://nextjs.org/docs](https://nextjs.org/docs)) to get started with these and all the other features of Next.js. As Vercel puts it: *Let’s make the web. Faster.*

    date: 2021-06-15T00:00:00.000Z
    slug: next-js-11
    tags:
      - next-js
      - react-js
    intro: >-
      The team over at Vercel just announced Next.js 11. These are the important new updates to Next.js you need to know about.
    teaserCopy: >-
      The team over at Vercel just announced Next.js 11. These are the important new updates to Next.js you need to know about.
    teaserImage: /img/articles/next-js-11-hero.jpg
    title: What's new in Next.js 11?
  - type: articles
    body: >-
      ## But!

      Before we start, let's debunk a few reasons why not to start writing that you probably told yourself.

      * *I don't know what to write about.* What do you enjoy doing? For me, I like to explore new front-end development technologies and patterns. While doing this, I learn a lot about specific topics. It's a great way to get started by writing up your findings and sharing them with the world.

      * *There is somebody (better) out there who has already written about this.* Sure, but you bring your view and experience to the table. Articles by just a few writers would get dull real quick. Try writing your articles from your point of view.

      * *I don't have the time to write an article.* This one always got me as well. I saw all these lengthy articles on medium and felt discouraged to write my own. The thing is, articles can be whatever length you want. If you don't have the time or want to write lengthy articles try splitting it into multiple parts. Next to that, I have written a bunch of short articles called QuickBits. In these QuickBits I focus on something small I learned and want to share with the world. Usually, I can knock these out in about 20 minutes.

      * *I can't write.* For me, this consists of two parts. Firstly, there is storytelling. I usually try to write as if I was explaining the subject to a co-worker or friend. Writing like this feels, in my opinion, most natural. Secondly, I used to make quite a few grammar mistakes. Lately, I've been using [Grammarly](https://www.grammarly.com) to check this before publishing. The cool thing is that Grammarly not just corrects, but also explains why it was wrong. This way, you won't make the same mistake next time.

      ## Share your findings

      The cool thing about (front-end) development is that you never stop learning. Whether it is a new framework, a different way of doing things or else, you continuously learn new things. Chances are that you have co-workers and friends who would find that interesting as well. Writing articles is a great way to share your findings and views with them.


      More times than I can count I've had conversations with peers and was able to share one of my articles with them to give them more information on a subject and my view on this. The response has always been great and it's what motivates me to keep writing on a wide variety of subjects.

      ## Showcase your work

      One of the most heard quotes during job interviews is "I can't share that code because it's a client project". Unless you have quite a few side-projects that perfectly reflect your work, it's hard to give somebody good insights on what you work on as a developer, what you find important and how you work. Although an article may not give as much insight into your hard skills as an actual codebase, you can paint a fairly good picture. If you look through my articles you probably notice that I do quite a bit of work with Next.js and the engineering side of front-end development. If I didn't write all those separate articles, you might've just had to take my word on it.


      What I usually do when I want to share something I worked on at a client project is to create a standalone demo "project". This could be as small as a Codepen with the isolated problem and how you fixed it. This way you can share how you tackled the problem without having to share company code.

      ## Learn to convey a message

      The hard thing about writing articles is that you have a good picture of who your target audience is but you don't know how well known they are with the subject. I've had this struggle in the past as well while giving guest lectures. You have to try to convey your message, make it easy to follow and keep it interesting for all. By writing articles, you can practice this skill. You can then use it while communicating on your project with your peers or during public speaking.

      ## Get discovered

      The final thing I love about writing is getting discovered. I always share my articles on LinkedIn with the world. Recently, I have been found someone and invited to give a talk at their company about what I write about. This is a perfect example of how something that started as a simple article can turn into an awesome speaking opportunity. This is, of course, if that sounds like something you'd want to do.

      ## So, get started!

      I can keep naming reasons why you should start writing, but I think you get the point. Try to start small and maybe just write a short article on a problem you encountered and how you fixed it. You'll see that it's incredibly fun to do!

    date: 2021-06-04T00:00:00.000Z
    slug: why-i-write
    tags: []
    intro: >-
      Writing articles is one of the things I started doing fairly regularly over the past year. It took quite a while for me to get into it so I want to share why I write and why you should start.
    teaserCopy: >-
      Writing articles is one of the things I started doing fairly regularly over the past year. It took quite a while for me to get into it so I want to share why I write and why you should start.
    teaserImage: /img/articles/why-i-write-hero.jpg
    title: Why I write and you should too
  - type: articles
    body: >-
      ## The problem with waterfall


      ![Interaction design (ID), visual design (VD) and front-end development (FED) working with a waterfall approach](/img/articles/design-front-end-development-waterfall.png)*Interaction design (ID), visual design (VD) and front-end development (FED) working with a waterfall approach*


      A traditional way of collaboration between visual design, interaction design and front-end development is the waterfall technique with a review moment. Visual and interaction designers work together to produce a static design. Front-end developers translate this design into interactive components. At the end of this process, there's a moment to review the implementation by all parties.


      The problem with this approach is that design and front-end development produce output for vastly different mediums. Often, designs are made in tools like Sketch, Figma or the Adobe suite. The tool outputs static images. For front-end development, the output is for a virtually unlimited variation in mediums. There are functionalities in these design tools to create interactive designs, but they don't offer the vast range of devices, browsers, screen sizes and other factors.


      > In front-end development there is no one-size-fits-all


      This causes issues when a design is made for a limited number of these variations (usually being a mobile, tablet and desktop viewport). Design issues or potential opportunities arise late in the production cycle. I often see that the time and capabilities to resolve these are limited at this stage. Most of these issues can be prevented by not just leveraging design handoff in the browser, but changing the approach to how design and front-end development work together.

      ## Several stages of design and development collaboration


      ![Interaction design (ID), visual design (VD) and front-end development (FED) working together in different stages of producing components](/img/articles/design-front-end-development-fluid.png)*Interaction design (ID), visual design (VD) and front-end development (FED) working together in different stages of producing components*


      Front-end development at my company Mirabeau, a Cognizant Digital Business, is in the same unit as visual design and interaction design. This structure has been set up for tight collaboration between these disciplines. In projects as a front-end developer, I've identified six major stages where design and front-end development can take advantage of each other's view, experience and skillset.


      ### 1. Concepting

      During the concepting phase, design often works with stakeholders and users to identify what the problem is and how they can solve it. Even though there isn't a line of code being written yet, this is where front-end development can help in identifying issues early on and, perhaps even more important, suggesting potential opportunities. For example, there is an ask for an incredibly important alert component. Did you know that on some mobile browsers you can use the phone's vibration to give haptic feedback? By involving front-end development in the concepting phase, these kinds of opportunities can contribute to a better solution for the user.


      ### 2. Design production

      After this front-end development can assist design during the actual production phase. A tight collaboration in this phase adds a lot of value by having a back-and-forth between disciplines. Design can actively seek input from front-end development when taking the solution from concept to an actual design that will be implemented. Due to diversity in view, experience and skillset, both design and front-end development push each other to see problems through different eyes. This always leads to a better thought-out and considered result.

      ### 3. Design review


      Once the design production is done, there is a moment for front-end development to do a final review. Design and front-end development go over the proposed solution, see if everything is clear and whether there are still improvements to be made. For example, front-end builds in reusable components and sizings. Does the proposed design suddenly use vastly different sizings? Is there really the need for a new kind of dropdown component? These questions can be asked to ensure consistency, preventing reinventing the wheel and more.


      ### 4. Browser handoff

      Next, front-end development builds the design. This is where the most vital part of the approach lies. There is no way you can predict and prevent all potential issues you will encounter. With real content or data, the fluidity of the web and different context in which design is used you're bound to find problems. For example, a narrow component with a welcome message does not fit on an in-between screen size due to a longer name. During the design phase, two things weren't accounted for. First, a design was made for mobile and tablet. What about right in between? Second, during the design phase, the default persona was used with a name eight characters long. With production users, there can be a wide range of lengths of users' names.


      Luckily, design and front-end development have been working tightly together online or in person. They work together in the browser to identify the specifics of the issue, brainstorm options and build the solution in the browser together. The disciplines come up with the solution together when there is an unusually long name. There is no need to update all the actual designs. In the end, we all work together to build for the web. Our single source of truth lives there and this is where we collaboratively craft our final version.

      ### 5. Development review

      After front-end completes their work, there is a final session between design and front-end development to dot the i's and cross the t's. I've noticed a lot of designers I worked with who are really appreciative of this moment. Together design and front-end development go over the final implementation. Are there some things that front-end development missed? Are there some things the design would like to alter based on the actual interactive product?


      > Here's where we perfect our creation together


      I've asked my colleague and interaction designer Virginia Rispoli what she thinks about browser handoff and the development review. Virginia loves that you can finally see the interactions and designs in action. This usually allows both design and front-end development to look at the ideas, features and components a bit more critically. To her, this is the moment where the superpowers and skills of design and front-end development come together. If both are open enough to discuss and rethink their ideas, the result is always better than the initial idea.


      These points are further solidified by my colleague and visual designer Alexander Munz. He states that the advantages of design handoff in the browser are diverse. It’s a great opportunity to collaborate between development and design; seeing, feeling and anticipating behaviours on an iteration of the end-product offers the opportunity to discover, change and adapt quickly. Design handoff in the browser and collaboration offers the opportunity to learn from each other, create better solutions and do this a lot quicker then re-designing a static screen in your design tool of choice. The team saves time, which gives the client more value for their money and they can even be part of the fun if they choose to be.

      ### 6. Documentation

      Lastly, we document our single source of truth. There's already a static design, so what's the point of documenting the component again? Besides developer-documentation on how to work with the component, we want to document the interactive component in a way where you can view it in all the contexts you'd like.


      ![Storybook showcasing a badge component](/img/articles/storybook.jpg)*Storybook showcasing a badge component*


      A good solution for this is an interactive component showcase library, the best-known among them being [Storybook](https://storybook.js.org/). Storybook offers a flexible UI for both design and front-end development to not just view and interact with the components, but alter them as well. With the wide range of features and plugins you can dynamically change the content (e.g. change the name in a component to more characters), test different screen sizes and more. This fluid version of showcasing the design implemented in interactive components is most flexible.


      Finally, documenting all existing interactive components and variations gives the team a place to reference. For example, design might check whether there's already a dropdown component, developers look up what variants they can use and copywriters can see what happens when they change certain labels.

      ## Get started in your team

      Excited to try a similar approach? There are a few people you might want to open the discussion up to. First, open up the discussion with your design and front-end development team. Try to see if you ever ran into some of the issues I mentioned above. In my experience, design is often very open to more moments of working together with front-end development.


      Second, you might work in a scrum team. Propose this new way of working together as design and front-end development to your project manager and scrum master. It might be a bit too much to completely overhaul the current workflow you have. Start with one new component. If it works, try it again and again.


      Finally, you might have to persuade certain stakeholders. This will be on a case-by-case basis. Time, costs and resources however are an often-heared concern. You are asking for more time together to craft the best work possible. An immense benefit of this new approach is that you actually resolve many of these concerns. You tackle (potential) issues early on. This costs time at the start of the trajectory, but you earn this back by mitigating the surfacing of these issues at the end or even in production. You could use the components you build while trying out this workflow as examples to get them on board.


      Try to see if this way of working works well for your team. This doesn't work for you? That's fine as well. The goal is to further improve cross-discipline collaboration and ensure you build your best work together!

    date: 2021-02-17T00:00:00.000Z
    slug: design-handoff-in-the-browser
    tags:
      - front-end
      - design
    intro: >-
      I strongly believe in the concept of leveraging design handoff in the browser. I noticed many benefits for me as a front-end developer and the designers I work with using this approach. In this blog post, you will find out why you should design in the browser, how it works and how to start
    teaserCopy: >-
      I strongly believe in the concept of leveraging design handoff in the browser. I noticed many benefits for me as a front-end developer and the designers I work with using this approach. In this blog post, you will find out why you should design in the browser, how it works and how to start
    teaserImage: /img/articles/design-handoff-browser.jpg
    title: Design handoff in the browser
  - type: articles
    body: >-
      ## Why did I need this?

      I'm a fairly social (read easily distracted) guy. In an office setting, this causes some self-inflicted issues for me. On the one hand, it's great to interact with all my colleagues, on the other hand, I lack the prolonged focus to be productive. It's easy to blame others for this, but why does it get even worse while working at home?


      What I noticed is that verbal communication shifted to digital. Having a digital wall between you and the person trying to reach you is a big culprit in the daily interruptions in your work. In an office, people can see you working focussed with your fancy noise-cancelling headphones on and determine whether they should bother you with what they're about to say or ask. With everybody working at home this short moment of hesitation is gone.


      The basic advice people give is to turn off notifications and batch reply to all of your messages. For me, this is easier said than done. Let's say I respond and start a task, I usually get a message back after a few minutes. There is this urge for me to respond as quickly as the person I'm talking to. Should I now keep chatting with everybody for a while or interrupt my flow continuously? It all feels very unstructured.


      I researched some ways to keep focussed while still be able to alternate between different task like coding, communicating and coffees. You know, the big three C's! In my search, I stumbled upon the well known Pomodoro technique for time-management developed in the late 1980s by university student Francesco Cirillo. I've heard about it before but never really tried it out as I often feel fatigued by all these techniques everybody swears by until it's time to make the next blog or video.


      The Pomodoro technique helped me with improving my productivity without turning it into a large task itself. It felt very natural to work with and I will continue working this way in the future.

      ## How does it help?

      Great, so how does it help and work? In short, you divide your day into 25-minute sessions to work on smaller tasks. You set a Pomodoro (named after the tomato-shaped timer) for 25 minutes. You don't stop working on your task while that timer is running for anything. Well, if your house is on fire you might want to break the rules a bit. After the timer runs out you have a short break of five minutes. During this break, you might stretch your legs, make a coffee or stare out the window contemplating life. The important point here is that you detach from your working state. After the five-minute break timer runs out, you start another Pomodoro for 25 minutes. After four 25-minute Pomodoro's you take a longer break of 15 minutes. You repeat this pattern for your entire day using these fixed sections to focus on a single task.


      There are numerous benefits by doing this as described [here](https://todoist.com/productivity-methods/pomodoro-technique). What worked well in particular for me is having fixed time slots without putting them on a calendar. I've tried planning my calendar by the minute for an entire day before. This gave me a state of anxiety of having this calendar standing over my shoulder and continuously feeling like a was "catching up". With the Pomodoro technique, I have the structure of time slots without worrying if I'm a few minutes behind on some things.


      Next, it helped me to break down seemingly gigantic tasks into smaller chunks of work. This doesn't just give me more structure but comes with a second benefit. I'm more easily able to mix these tasks throughout my day. I can focus on singular tasks while still work on different larger tasks during the workday at the same time. This, to me, is the most vital improvement to my productivity and state of mind.

      ## What did I make?

      Luckily, to use this technique all you need is the timer on your phone or computer. But where's the fun in that? I'm a front-end developer. I can make something cool! As part of my learning goals this year I want to build a few small projects with the focus on design. I often get caught up in the engineering side of front-end development and want to work on some more creative projects as well. For this, I picked a few front-end challenges from [frontendmentor.io](http://frontendmentor.io/challenges). One of the challenges happens to be a Pomodoro timer. That sounds like a perfect match!


      The logic for a timer is fairly straight-forward. You either set an interval or recursive function that calls itself after a timeout. The timer then makes a short alarm sound. The reason I picked the challenge of the Pomodoro timer is the neumorphic design. If you're not familiar with the term, it's a design style successor to skeuomorphic design. The goal of skeumorphism is an affordance for the user by using known real-life things. A folder on your computer looks and is named like that as it directly reflects a real-life folder used by people. Therefore, people know what it is and what it does before needing to learn about it.


      Neumorphism is not as focused on affordance as it is to give depth to interfaces. After the flat-design hype that you've seen in nearly every digital interface the past few years, this design style seems to focus more making it clear to users where elements are to each other on a "stack level". I'm not sure about the affordance benefits, but I do think it looks refreshing and very cool!

      ### Design

      ![Pomodoro](/img/articles/pomodoro-hero.jpg)*Neumorphic Pomodoro*

      As you can see, the tabs at the tab are flat-design. The timer itself however seems to protrude from the background. It's clear that this is the most important element on the screen and I can interact with it. The way this effect is done is through shadows on the screen the contrast between dark and light shadows make it look like the timer itself is "higher" of the background. I used neumorphism to create the base effect in box shadows for CSS. I then tweaked the size and colour values to the point I was happy with the result. A fairly simple, but refreshing design to see on the web which at this point is flatter than the Netherlands.

      ### Interactivity

      ![Pomodoro settings](/img/articles/pomodoro-settings.jpg)*Settings*

      The second part of the challenge is to let the user set different values for the timers, choose a font and set a different primary colour. Through this modal, the user can tweak how the website works and looks. For the font and primary colour, I used CSS-variables. Whenever the user makes a change, I update the corresponding variable and the browser updates the screen accordingly.

      ### Progressive Web App?

      ![Pomodoro Progressive Web App on MacOS](/img/articles/pomodoro-pwa.jpg)*Pomodoro Progressive Web App on MacOS*

      My Pomodoro app just needs some static files to work. I added a service worker to cache all the static files and serve them if my server is down or internet connectivity is lost. This ensures that the app will always work. Next to that, I added a manifest with some more information about the app. This turned my app into a Progressive Web App (PWA). Besides the before-mentioned offline capabilities, the app can now be installed on desktop, tablet and mobile devices as well. This makes it easier to quickly open the Pomodoro from the device you're working on.

      ### Demo

      If you made it this far, you probably want to try it out. You can do so by visiting [pomodoro.davebitter.com](https://pomodoro.davebitter.com/). You can view the individual components through Storybook at [pomodoro.davebitter.com/components](https://pomodoro.davebitter.com/components). Finally, developers can head over to [github.com/DaveBitter/pomodoro](https://github.com/DaveBitter/pomodoro) to look at the source code.

      ## Wrapping up

      This technique, or rather part of this technique, works for me. It might not for you and that's fine. I suggest to try it out for a day and see what you think. I noticed a welcome change in how I structure my days and do my work. As always, thanks for reading and I see you in the next one!
    date: 2021-01-19T00:00:00.000Z
    slug: neumorphic-pomodoro
    tags:
      - pwa
      - next-js
      - react-js
    intro: >-
      There is this view many developers share of having a productive coding session by crawling behind your laptop, put on your fancy noise-cancelling headphones and grinding out a few hours of work. I often fall for this novelty of hyper-productive work state in development. Since working full-time from home I noticed a serious decline in my productivity and focus. How is this possible and how can I resolve this?
    teaserCopy: >-
      There is this view many developers share of having a productive coding session by crawling behind your laptop, put on your fancy noise-cancelling headphones and grinding out a few hours of work. I often fall for this novelty of hyper-productive work state in development. Since working full-time from home I noticed a serious decline in my productivity and focus. How is this possible and how can I resolve this?
    teaserImage: /img/articles/pomodoro-hero.jpg
    title: I build a neumorphic Pomodoro to stay sane
  - type: articles
    body: >-
      ## Ultra quick setup

      Many of the people I speak to regarding [React.js](https://reactjs.org/) use [Create React App](https://github.com/facebook/create-react-app) (CRA) to quickly bootstrap applications. It would be great if [Next.js](https://nextjs.org/) had something similar. Let's call it Create Next App (CNA). Well, it exists! [Vercel](https://vercel.com/), the company behind Next.js has created [CNA](https://nextjs.org/docs/api-reference/create-next-app). Let's have a look.


      ![yarn create next-app](/img/articles/create-next-app-command.png)


      You will be guided to an interactive setup that will just ask you for a project name. After that, all the required node modules will be installed and a very basic Next.js app will be bootstrapped. You could opt-in for a TypeScript variant as well. The output should look something like this:


      ![Outputted Create Next App folders](/img/articles/create-next-app-folders.jpg)*Outputted Create Next App folders*


      Note: you can ignore the `pages/api` folder for now. If you are interested in the feature you can have a read at my article ["Next.js API routes"](https://www.davebitter.com/articles/next-js-api-routes).


      For those who are familiar with CRA, this will look very familiar. Besides all the build tools, CNA outputs a simple home page with an image and some styling. As you can see, by default CSS modules are used. If you want to add something like SCSS you can easily do so by installing SCSS. Next.js will just work. Next to all of this, CNA comes with the development tools that you'd expect it to like, for instance, hot-module reloading. In my experience, the way you alter your CRA project for things like linting and rules is very similar in CNA. Please refer to the documentation if you want more details. That's it, you are now ready to start developing!


      ![yarn dev](/img/articles/create-next-app-dev.png)


      ![Create Next App default page](/img/articles/create-next-app-boilerplate-page.jpg)*Create Next App default page*


      ## Building your first page

      Naturally, Next.js documented all you need to know very well. Let's have a quick look however how we can build our first page.

      ### Standard route

      The `pages` folder is a special folder by Next.js. Basically, every file in this folder translates to a route. For example, by default, you see an `index.js` file. This gets build into `/index.html`.  So what if we want to create an about page. Well, we make a file called `about.js` and return a React.js component. In this case a functional component:


      ![Created "about" page](/img/articles/create-next-app-about-page.png)*Created "about" page*


      If you go to `/about` in your browser you will see that you now have an about page. This is all you need to do to create pages. Creating folders works as you expect it to. `pages/contact/socials.js` will translate to `/contact/socials.html`.


      From here on out you can write all the same React.js code you are familiar with for every page. As you might have guessed, you can use [Next links](https://nextjs.org/docs/api-reference/next/link) to take care of your client-side routing.

      ### Dynamic routes

      So what if we need to use dynamic routes. In the case of my blog, I have various articles under `/articles/... .html`. It wouldn't make sense to create a separate file for each new article. This is where dynamic routes come in. You can use the special bracket notation to indicate to Next.js that a part of the route is dynamic. In the case of the example of the articles, we can create a file under `pages/articles/[slug].js`. Whatever you put as a slug now in the URL will be mapped to this file. There is one small addition you need to make that we'll cover in the next chapter.

      ### Special page files

      As you may have noticed, there is a file called `pages/_app.js`. Next.js has a couple of special files which are prefixed with a `_`. This specific file is exactly the same as the file you might have worked with in a CRA React.js app. It is a sort of "wrapper component" around your page. Here, you could for instance load a header, navigation and footer component that will be loaded for each page. Next to this file, there are a few more. `pages/_error.js` is a page that will be loaded if there is a critical error. You can create a bit of a nicer page than the default one if you want. Finally, there is a `pages/_document.js` page which is a "wrapper-page" around the `pages/_app.js` where you can load for instance some external scripts or set meta-information in the `head`. Please refer to the documentation for these pages to learn more.

      ## You can stop here

      Great, that's the basics. We now have React.js pages build with Next.js that will be rendered server-side. Next.js takes care of the development environment and build process with things like automatic code-splitting, minifying and post-processing. You can stop here for now or take it up one notch and really get the benefits of Next.js.

      ## A short introduction to server-side functions

      By far, having server-side functions is one of Next.js's biggest features. It may sound a bit daunting at first, but let's look at some practical examples of how to use it.

      In essence, these functions run on the server, or during build time, before the page gets loaded in the client. These functions can, for instance, fetch some needed data on the server, return the data as a React.js prop to the page and be rendered on the server based on the value.

      ### getInitialProps

      Let's keep using the blog as an example. When the user navigates to `/articles/the-meaning-of-life` we want to fetch the articles from a CMS and return it as a React.js prop to the page. This is done through by exporting a special Next.js function. This could look something like this:


      ![Code example getInitialProps](/img/articles/create-next-app-get-initial-props.png)*Code example getInitialProps*


      As you can see, we retrieve the dynamic slug from the request object, fetch the article and return the article. We now receive it as a React.js prop for the page itself. You can now use the data to render the page (server-side).


      There is however a small addition to this. Next.js needs to know what all the possible slugs are in order to build a page for every article. We can do this by exporting another special Next.js function like this:


      ![Code example getStaticPaths](/img/articles/create-next-app-get-static-paths.png)*Code example getStaticPaths*


      Based on this array of slugs, Next.js will now build pages during the build process.

      ### getInitialProps

      The previous example is used when you want to fetch some data on the serving during build time, but what if you want to fetch during run time? You can export an other special Next.js function like this:


      ![Code example getInitialPaths](/img/articles/create-next-app-get-initial-paths.png)*Code example getInitialPaths*


      The vital difference in this function, compared to the previous one, is that this will only run on run time. This page will therefore no longer be statically generated but requires either a Node.js server or serverless function. The question is how you want to host your site. A statically generated site is easier to deploy as it is just some static files, a Node.js server or serverless environment will allow you to retrieve data on demand. The cool thing about Next.js is that you can use both these techniques on different pages. If you want to dive a bit more into this part of Next.js I suggest you to read my article ["Next.js page generation"](https://www.davebitter.com/articles/next-js-page-generation).

      ## Deploying your Next.js app

      The deployment of your Next.js app depends on a variety of factors. Let's take a statically generated site for the purpose of keeping it simple. You can run the following command to create a fresh build of your app:


      ![yarn build](/img/articles/create-next-app-build.png)


      You then have to add a new NPM script called `export` that runs the command `next export`. Once you run that you will have the following output:


      ![yarn export](/img/articles/create-next-app-export.png)


      ![Outputted Create Next App export](/img/articles/create-next-app-export.jpg)*Outputted Create Next App export*


      You're now free to host these static files wherever you want. In the case of going for serverless, you might want to check out my article [Implementing the latest web technologies to boost the Mirabeau blog](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies).

      ## C'est tout!

      That's it, in my opinion, you should be able to do most of what you want with these basic principles. I often write about Next.js. Please refer to [my Next.js articles](https://www.davebitter.com/tags/next-js) as well as the [Next.js documentation](https://nextjs.org/docs) if you are interested in going a bit deeper in the matter.


      Finally, you can have a look at [my personal Next.js boilerplate](https://github.com/DaveBitter/next-boilerplate) based on this which includes all the things you might want to add like unit tests with [Jest](https://jestjs.io/) and [Enzyme](https://github.com/enzymejs/enzyme), [Storybook](https://storybook.js.org/), linting and more.
    date: 2020-12-07T00:00:00.000Z
    slug: a-simple-yet-detailled-introduction-to-next-js
    tags:
      - next-js
      - react-js
      - spa
    intro: >-
      Many of my articles regarding Next.js are intermediate to advanced. Even though there are many articles out there for starting with Next.js, I want to share my point of view and perhaps help you on your way to creating your first kick-ass Next.js application.
    teaserCopy: >-
      Many of my articles regarding Next.js are intermediate to advanced. Even though there are many articles out there for starting with Next.js, I want to share my point of view and perhaps help you on your way to creating your first kick-ass Next.js application.
    teaserImage: /img/articles/create-next-app-hero.jpg
    title: A simple, yet detailed introduction to Next.js
  - type: articles
    body: >-
      ## What can a PWA offer?

      Before covering design, it does make sense to go over the technical possibilities. Let's focus on the most important features, in my opinion, of a PWA or web features that a PWA can leverage. I'll try to keep it as short as possible while still giving you an idea of what a PWA might look like.

      ### Add to home-screen (A2H)

      A2H is a basic, but incredibly useful. We can trigger a button to add the PWA to the user's home screen right from the website. This is possible after meeting the requirements for installability:

      * The website needs to be served over `https`

      * The website needs to register a Service Worker

      * The web app manifest needs to meet installability requirements

          * Icons for various sizes

          * A `short_name` or `name` property (e.g 'Dave Bitter')

          * A `start_url` property to start the PWA from (e.g. '/')

          * A `display` property (e.g. 'fullscreen', 'standalone' or 'minimal-ui')


      ![PWA install trigger](/img/articles/pwa-install-trigger.jpg)*PWA install trigger*


      After meeting these requirements, developers can trigger the button. A good thing to note is that even though we'd like to trigger this on phones and tablets, this will also work on a desktop.

      ### Offline capabilities through a Service Worker

      As mentioned, the PWA needs to register a [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers) (SW). Although registering a SW that does nothing will work, it would be a shame not to use this tool. A SW is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. We can use this, for instance, to cache pages when they are loaded for a user. When internet connectivity is lost, we can serve the offline cached version with a small message notifying the user what is going on. This way, like native, we can always offer a working solution.

      ## Web API's to offer native-like capabilities

      Now we have the base of our PWA we can take it to the next level. The web offers many features through Web API's that we can leverage to further increase UX, improve reach and retain users. Let's go over a Web API that might be useful for your PWA.


      Notifications are a vital tool to ensure retention. The web supports this through the [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/notification). Great, we can start sending notifications like native apps. Well yes, but it's not that straightforward. Two things will hold you back.


      Firstly, we need to request permission to send notifications. You might have seen those annoying popups on news websites. Users often deny this as they're just trying to read an article. This is why it's important to trigger this request for permission on the right moment. The bigger reason this might hold you back is not being able to ask permission again next time the user visits.


      Secondly, there is one major player that doesn't offer support for this. As you can see below, at the time of writing, iOS Safari does not offer support for the Notification API. This is often a dealbreaker as this is often a large part of the user base.


      ![Notification API support](/img/articles/notification-api-support.jpg)*Notification API support*


      So, does this mean that you have to switch completely to native? Well, not necessarily. The way I see it, you have two routes you can take. You either go for progressive enhancement. For devices that support the Notification API, we use it. For devices that don't, we omit this feature or implement it in another way (e.g. email notification). The other route is wrapping your PWA in a native shell. This way, you can make use of the native notification possibilities while loading your PWA in the native wrapper itself. Next to that, these native wrappers cater for the often expressed need to have a presence in the Apple Appstore and Google Playstore. To get a clearer picture of this, please read my article ["Wrapping your Progressive Web App for Android with Trusted Web Activity"](/articles/wrapping-your-progressive-web-app-for-android-with-trusted-web-activities).

      ## Why do we need to address the design part?

      Great, the technical part is out of the way. So why do we need to talk about design? I mean, we have a mobile version of the website right? Correct! And that's great to ensure that users get the best user experience on their mobile device. There is however one vital difference between a mobile website and a native app-like experience through a PWA. Over the course of time interface and interaction, patterns have been crafted for native apps. When trying to mimic a native app with a PWA we need to take this into account. If we don't, the PWA will feel like a website with a PWA slapped around it.

      ## How can we improve the design part?

      ### Interface patterns

      Let's look at a quick example. An interface pattern for a website is having a header, body with sections and finally a footer. This is great to use for the web, but you never see this in a native app. In a native app, you will see something called an 'app shell' that has a main part or view to load content in. This content is, for instance, something like a list. You can see this in social media applications. You often have a top navigation bar and a bottom tab navigation. These parts always remain on the screen. In the content section, you might see a list of posts by other users.


      ![App shell](/img/articles/app-shell.jpg)*App shell*


      This, amongst other patterns, gives the native app feeling. It's important to remember this when designing for a PWA. You can still design and build a mobile website next to the PWA. Developers can detect whether the website is loaded in a PWA and load the UI accordingly.

      ### Interaction patterns

      On an interaction level, we should have a look at interaction patterns. As a simple example, let's take a look at the bottom tab navigation. Every tab is like a separate browser tab. Open your Instagram app. Now scroll the feed, go over to notifications and click on one of them. If you go back to feed using the bottom tab navigation, you will see that it's still where you left it off. Now go back to the notification using the bottom navigation tab again. That's right, exactly where you left off. This is one of the numerous examples of how native apps work. We can replicate this behaviour on the web, but it does require designers and developers working together to account for this.

      Another example is the way the top navigation bar is used to show the user where they are and how to get back. By loading a fullscreen PWA you lose the browser bar. It can therefore be hard to see where you are and how you can go back to the previous page.


      ![Instagram bottom tab navigation](/img/articles/instagram-feed.png)*Instagram bottom tab navigation*


      ### Ubiquitous features

      Besides interaction patterns, we can have a look at ubiquitous features in native apps. Previously, we mentioned offline support. We can have a version of our PWA with limited features when offline. On native apps, however, I expect more as a user. Let's say I add a task to my todo list in a PWA. On a native app, I expect it to add it without internet connectivity and store it in the actual database once connectivity is restored. We can and should implement this in a PWA through a SW. It might be good to let the user know that it will store it after connectivity is restored. It will however already be added in the todo list.

      ## When should you go for a PWA?

      Great, so we can do a vast amount with PWA to replicate native apps. Should we now always go for PWA or still for native apps? Personally, I don't believe in this polarization. As we saw, the line between these two ways of building an application is getting more blurry by the minute.


      > "If a PWA offers you the capabilities you need, go for that. If not and native apps do, go for that"


      Sure, this oversimplifies the decision-making process. Every technique has its pros and cons. In the end, it’s our job to make the decision that not just benefits the client, but will help the user of the application with their problem the best. If you can go for PWA, great! If you can’t, that’s also fine. It’s just another tool that we leverage to create the best possible user experience.

      ### My decision-making process

      Generally, I first create a list of features that we will need. In case the web can offer all of those I tend to go for a PWA. We can ensure that all users, as it is the nature of the web, have access with whatever their device is. We then progressively enhance the user experience. If we need features like notifications we can either chose to offer it for supported devices of wrap the PWA in a native wrapper to ensure that all users have it. One of the strong points to go for this is having one application that runs on the web (with all its devices) and native.


      The moment I tend to go for native is on two occasions. Firstly, I tend to draw a line when I feel like I'm forcing the web for an app. This usually happens when the list of native features that should work for all devices is rather large and it starts to feel cumbersome to do all of that in a native wrapper around a PWA. Secondly, I advise you to go for native when performance is an issue. Despite all the work that is being done on the web, native apps still get one over on the web in terms of performance. This is fine, and it might be a wise decision to move over to native to ensure the best user experience.

      ## Closing thoughts

      The rise of the PWA (an awesome movie name by the way) poses new design questions. If we go for a native-like web experience, we need to change our entire approach. Slapping a PWA around a website doesn't cut it. On a variety of development and design levels, we need to have a good look at how to build the best possible solution. This can mean you'd want to go for native and that's absolutely fine.


      We have a great range of (new) tools to our disposal as developers and designers. This is exciting for the future for both. We need to work together to make tough decisions, follow proven patterns and create innovative new features. Thanks for reading!
    date: 2020-10-08T00:00:00.000Z
    slug: how-can-we-develop-and-design-for-a-pwa-to-deliver-the-best-native-user-experience
    tags:
      - pwa
      - twa
      - native
    intro: >-
      Progressive Web App (PWA) is often written about. These articles, including mine, mostly only cover the technical parts. Although vital, one aspect of building a successful PWA is design. How can we develop and design for PWA to deliver the best native user experience (UX)?
    teaserCopy: >-
      Progressive Web App (PWA) is often written about. These articles, including mine, mostly only cover the technical parts. Although vital, one aspect of building a successful PWA is design. How can we develop and design for PWA to deliver the best native user experience (UX)?
    teaserImage: /img/articles/design-and-develop-for-pwa.jpg
    title: How can we develop and design for a PWA to deliver the best native user experience?
  - type: articles
    body: >-
      [Trusted Web Activity (TWA)](https://developers.google.com/web/android/trusted-web-activity) is a technique to wrap your PWA in a native shell for Android. Make sure to notice the difference between PWA and TWA as this article wouldn't make much sense otherwise. If you are unfamiliar on want to learn more about PWA please refer to my article ["You might not need a native app"](/articles/you-might-not-need-a-native-app).


      Being able to build one experience cross-platform by using web techniques is one of the unique selling points of PWA. By progressively enhancing your web application with PWA features you can offer a good user experience for a variety of different users. Although you can add a PWA to your home screen, like a native app, people would still have to visit your web application in their browser. People are used to searching in their native store first. This store presence is what we want to cater for.

      ## Why TWA?

      Before TWA and still, on iOS you would traditionally load your web application in something called a [Web View](https://developer.android.com/reference/android/webkit/WebView) or a [Chrome Custom Tab (CCT)](https://developers.google.com/web/android/custom-tabs). The application is bundled with a browser that will load your page. This seems to have worked fine so why this new technique by Google?


      ![Webview, CCT and TWA comparison](/img/articles/webview-cct-twa-comparison.jpg)*Webview, CCT and TWA comparison*


      In short, TWA is Google's push to ensure a seamless user experience when loading web content in an Android app. One of those features is the ability to hide the address bar similar to an install PWA on a phone. Next to that, TWA is significantly faster, can share cookies with the web application, autocomplete data with the browser and send callbacks to the application. Finally, it will make use of the user's native chrome browser. This ensures that your web application will most likely always be loaded on the most recent version of Chrome. Developers can appreciate this when using fairly new browser APIs loaded through progressive enhancement.

      > "If you are loading web content, use TWA" - Google

      ## Sounds good. How?

      ### Bubblewrap

      As a front-end developer, I wasn't ready to start programming in Java or Kotlin. I just spend all this time crafting a highly performant PWA. Luckily, you don't have to. Google partnered with Samsung to make a great developer experience. By building the [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap) it allows developers to create a TWA out of their PWA without having to look at any native code. "Have" is key here. I don't want to be locked into a framework. Luckily, Bubblewrap just creates the native code for you and delivers a regular Android project. If you want to further develop on native features you can always do so. This sold me.

      I won't go fully into the technical details, but the CLI works as follows. It reads information from the `manifest.json` of you PWA. It then uses that, in addition to a few extra questions, to initialize the Android project. It then offers you a command to create a build. You could, however, use Android Studio from here on out to build the Android app.

      ### Digital Asset Links

      Finally, we need to verify that we own the web application. If you didn't need to, you could load somebody else's web application as your own and put it on the Playstore. Without doing this step, you see the chrome browser bar at the top of your TWA. Luckily, when using the Bubblewrap CLI to create a build, it generates a file for you called `assetlinks.json`. All you need to do is place this in the public folder of your website under `/.well-known/assetlinks.json`. The TWA can then verify that you own the web application.


      Oh yeah, if you don't want to spend two days figuring why this step didn't work let me do you a solid. It mentions nowhere in the docs that during the initialization of the TWA you need to put `https://www.` in front of the domain, you input. Without doing this, even with `https://` , it will not work.

      That's it, you now have an Android application of your PWA by using TWA!

      ## Looking back

      Google and Samsung seem to really be pushing for this new technique. Luckily, it's safe to use as the TWA will fallback if you don't meet support (Chrome 72 and above) with a CCT. This ensures that you can use the latest and greatest while still offering a solution for older browsers and/or phones. This is another technique we can use as a front-end developer to blur the lines between web and native. Next to that, it can help you to convince your client to go for PWA. I am very excited about TWA and will closely monitor the development of this. Thanks for reading!
    date: 2020-09-15T00:00:00.000Z
    slug: wrapping-your-progressive-web-app-for-android-with-trusted-web-activities
    tags:
      - pwa
      - twa
      - native
    intro: >-
      One of the first things people mention when proposing Progressive Web Apps (PWA) is the need for native store presence. Fair enough, let's make that work.
    teaserCopy: >-
      One of the first things people mention when proposing Progressive Web Apps (PWA) is the need for native store presence. Fair enough, let's make that work.
    teaserImage: /img/articles/wrapping-your-progressive-web-app-for-android-with-trusted-web-activities.jpg
    title: Wrapping your Progressive Web App for Android with Trusted Web Activity
  - type: articles
    body: >-
      As a heads-up, I won't be going over how to build things like pages in [Next.js](https://nextjs.org/), but rather focus on the generation techniques. If you're unfamiliar with Next.js, please refer to their documentation.

      ## SSR/SSG versus CSR

      We need to have a look at server-side rendering (SSR) and static site generation (SSG) versus client-side rendering In order to understand what Next.js offers. If you are up to speed with this, you can skip over this section and go straight over to "Generating pages with Next.js".

      ### SSR

      SSR is a technique where a request comes in, the server builds the HTML and responds with the final page. The great thing about SSR is that it's fast. The usually means great performance as more the server is most likely more powerful than your browser. An added upside is servers can cache these pages to serve to multiple users at the same time.

      The downside is that the user has to make this roundtrip for every page which can end up with slower user experience. More on this later.

      ### SSG

      Similar to SSR, SSG serves a build HTML page. The difference, however, is when this page is built. With SSR the page gets to build upon a request by a user. An SSG page is pre-build and deployed to a server. The server will always respond with the same page for every user. This makes it easy to cache and very performant.

      ### Dynamic routes

      The downside comes when you have dynamic routes. For example, a blog might have hundreds of articles. The URL can be `/blog/article-1.html`, `/blog/article-2.html`, ` /blog/article-3.html` etcetera. Here you have two options; either go with SSR or build every page out during build time.

      ### CSR

      Lastly, we can leverage the use of CSR. This type of rendering is what you see with default [React.js](https://reactjs.org/) applications. In essence, you serve an (empty) HTML page, the JavaScript bundle builds the page in the browser and updates the page when navigating without going to the server. These pages can be dynamic, as the SSG example as well.

      The downside of doing this is having to wait on the JavaScript bundle, that can be rather large, to load, then to parse and finally to build the HTML for the page. The initial loading time is quite long, uses much data on the user's network and demands processing power from the user's potentially low-end device.

      ## Generating pages with Next.js

      So which of these does Next.js leverage? Well, all of them. Next.js optimizes how pages are loaded with just a little help from the front-end developer. They allow you to mix and match based on your requirements. This makes page generation incredibly powerful, easy and quick. Let's have look at the tools at your disposal.

      ### SSR

      Firstly, let's have a look at SSR ([docs]([https://nextjs.org/docs/api-reference/data-fetching/getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps))). Next.js lets you export a special function from your page file called `getInitialProps`. In essence, this function:

      * runs on the server and lets the developer get for instance data

      * passes the returned object as a prop for the page

      * renders the initial render on the server

      * serves that HTML

      * finally hydrates the front-end as soon as the React.js/Next.ts is loaded in the front-end.

      ```jsx

      // Example of getInitialProps

      ...

      ArticlePage.getInitialProps = (async { req, res }) => {
          const article = await fetchArticle(req.query.slug);

          return {
              article
          };
      };

      ...

      ```

      After that, every page navigation by the user will update the page through CSR. This combination is highly performant and offers the best of SSR and CSR.

      ### Serverless architecture

      Shortly, I'd like to mention how you can host this server. Next.js allows you to either host a [Node.js](https://[nodejs.org](http://nodejs.org/) server where Next.js runs or make use of serverless functions for all the pages. The latter being more performant. You can read more about this in my blog [Implementing the latest web technologies to boost our blog](/articles/mirabeau-blog-latest-web-technologies).

      ### SSG

      Even though using the Next.js SSR technique works great, there is another step we can take. Some pages might not change. The HTML will always be the same. This sounds like a better job for SSG. Luckily, Next.js detects whether you export a `getInitialProps`. If not, it will use SSG ([docs](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)) to generate your page during build time. This works out of the box.

      You can still run a function before generating the page, but this only happens the one time during the build. Here, you fetch for instance some data and pass it as a prop for the page. To do this, you can export a function called `getStaticProps`.

      ```jsx

      // Example of getStaticProps

      ...

      export const getStaticProps: GetStaticProps = async context => {
          const article = await fetchArticle(req.query.slug);

          return {
              props: {
                  article
              }
          };
      }

      ...

      ```

      ### Dynamic routes

      Sometimes though, pages might not change, but the URL is dynamic as with the blog example previously mentioned. So how do we generate all these pages during the build? Next.js thought about this. You can export a final function called `getStaticPaths` ([docs]([https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)))this function allows you to return an object with paths. This is where you tell Next.js all the dynamic routes that it needs to build. For the blog example, here you would pass a list of all the articles that exist. Next.js then takes that list and generates an HTML page for every item.

      ```jsx

      // Example of getStaticPaths

      ...

      export const getStaticPaths = async () => {
          const articleSlugs = await fetchArticleSlugs();

          return {
              paths: articleSlugs
          };
      }

      ...

      ```

      ## Joining forces

      The combination of these different ways of generating pages is where Next.js shines. As shown, you can use these techniques for the use case you have. By being able to mix and match you always have the opportunity to choose the best way. Welcome to the future of Single Page Application development!
    date: 2020-09-02T00:00:00.000Z
    slug: next-js-page-generation
    tags:
      - next-js
      - react-js
      - spa
    intro: >-
      I often write about Next.js as it is my go-to framework when developing interactive React.js web applications. One of the core features of Next.js is the ability to generate pages on the server. Let's have a look at what is possible, how this works and how can leverage this when building web applications.
    teaserCopy: >-
      I often write about Next.js as it is my go-to framework when developing interactive React.js web applications. One of the core features of Next.js is the ability to generate pages on the server. Let's have a look at what is possible, how this works and how can leverage this when building web applications.
    teaserImage: /img/articles/next-page-generation.jpg
    title: Next.js page generation
  - type: articles
    body: >-
      ![Every great concept starts with a sketch](/img/articles/firebase-sketch.jpg)*Every great concept starts with a sketch*

      ## Weapons of choice

      Usually, these ideas need two parts to be realised. Let's have a look at how I like to handle both front- and back-end to build a fully functioning and rapidly built prototype.

      ### Building the Front-end part

      I've worked with [React.js](https://reactjs.org/) for years to build interactive applications. Although not needed for every project, it allows me to rapidly build prototypes or even production-level applications due to its [reactive behaviour](https://www.freecodecamp.org/news/how-to-bring-reactivity-into-react-with-states-exclude-redux-solution-4827d293dfc4/). Next (pun incoming) to that, [Next.js](https://nextjs.org/) takes away many of the downsides I used to find with React.js. You can read more about that in my article about [how I rebuild the Mirabeau blog from the ground up using Next.js, serverless and more](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies).

      ### 'Building' the Back-end part

      The back-end part is usually where the prototyping stops as it feels like a chore in the creative process. Sure, you can mock this part for the sake of prototyping, but getting across your idea works, in my opinion, best if a user can actually do all the things they want with as little mocked parts as possible.


      In my search for an easy way to deal with authentication and databases, I came across [Firebase](https://firebase.google.com/) by Google. Firebase is a mobile and web application development platform developed by Firebase, Inc. in 2011, then acquired by Google in 2014.


      So why Firebase? The platform offers many [features](https://firebase.google.com/products) for free to help you build whatever you want. I usually don't need all these features, but it allows me to pick just the parts I need.

      #### Letting the users log in

      Authentication is a ubiquitous part of any application nowadays. It allows me to store your preferences, data and more. Authentication is more than just logging in. I want to offer users to create, delete and update their account. Next to that, they should be able to recover their password, log in through social accounts, keep a session and more.


      ![Firebase login options](/img/articles/firebase-login.png)*Firebase login options*


      This is quite a lot when you just want to build your community cat food recipe tinder-based prototype. Luckily, Firebase offers this and more to you straight out of the box. Setting it up is as easy as flipping a few switches in the Firebase dashboard, as seen above, and implementing the logic in your prototype with the easy-to-use [Firebase SDK](https://firebase.google.com/docs/reference).

      #### Storing data

      Let's say you are building the community cat food recipe tinder-based prototype and the user has created an account and logged in. They might want to store recipes, upload pictures and look at other peoples recipes. Firebase has two types of databases in store. There is a more traditional [REST](https://restfulapi.net/) based database and a reactive 'real-time' database. The difference being the 'real-time' database allowing me to listen for any changes in the database and update the user interface accordingly.


      ![Firebase database](/img/articles/firebase-database.png)*Firebase database*


      Finally, I might want to store pictures to go with my recipes. Firebase offers [storing of media files](https://firebase.google.com/products/storage) as well. As all mentioned features, there is a limit in the free version, but it is high enough for your prototypes sake.

      ### Tying it all together

      Cool, we have a React.js front-end and a Firebase back-end. Now it's time to tie it together into a fully functioning prototype. I usually tend to go for the 'real-time' database since React.js is a perfect match due to its reactive nature. Below you can see how I implemented data fetching between React.js and Firebase using the Firebase SDK.


      ![React.js and Firebase data flow](/img/articles/firebase-react-flow.png)*React.js and Firebase data flow*


      The upside of handling your data fetching this way is having only one version of your data. Normally, I send an update to the database and update my user interface when the update went through successfully. I don't have to do this with this way of updating. I listen to the database for changes. Whenever I need to update something I send the update to the database and my listener will automatically get the updated document from Firebase.

      ## Practice what you preach

      I know this might sound like a paid advertisement by Firebase. I promise you it's not. I've built several prototypes or small applications doing this. Some examples are the internal tool I build to to see all presentations for [the Mirabeau weekly inspiration session event](https://blog.mirabeau.nl/en/articles/The_Best_Is_Yet_To_Come_one_year_of_love_and_pride/5soiFSn4y5HzO3J3nHhtmq) and the Mirabeau ski event signup application. A colleague used it to build a visitor registration tool after showing him what Firebase can do for you.


      ![The Best Is Yet To Come application built with Firebase](/img/articles/firebase-tbiytc.jpg)*The Best Is Yet To Come application built with Firebase*


      ![Company ski event application built with Firebase](/img/articles/firebase-apres-business.jpg)*Company ski event application built with Firebase*


      ## Break through limitations

      I've often limited my creativity by stopping at the concept phase due to technical requirements. Using the previously mentioned tools helped me to break through these limitations and start creating. I'm now able to quickly setup a new project with all the requirements I might have. Let's keep creating, we've got the tools available!
    date: 2020-08-17T00:00:00.000Z
    slug: prototype-with-firebase
    tags:
      - firebase
      - spa
      - react-js
    intro: >-
      I often come up with new ideas for applications and tools. I usually sketch these ideas in my notebook to build whenever I have spare time. This is where I used to stop because I didn't want to handle with things like databases, authentication and all other requirements that my idea might have.I asked myself 'How can I take my idea from sketch to a fully functioning and rapidly built prototype?'.
    teaserCopy: >-
      I often come up with new ideas for applications and tools. I used to stop at sketching these ideas in my notebook to build whenever I have spare time. I asked myself 'How can I take my idea from sketch to a fully functioning and rapidly built prototype?'.
    teaserImage: /img/articles/firebase-dave.png
    title: How to take an idea from sketch to a fully functioning and rapidly built prototype?
  - type: articles
    body: >-
      ## What do they do?

      You might have guessed it. [Next.js](https://nextjs.org/) API routes provide an easy to use way of building an API within your Next.js project. Most modern web applications need data whether it is articles, like this blog, or data about the weather. We want to separate data from our applications as much as possible. Let's say you build a blog. You don't want to bundle all the articles with your JavaScript bundle. You want to load your bundle, which loads your UI and utilities, which renders your full article. This makes sense, but how can you do this?

      ### Simply RESTful

      [GraphQL](https://graphql.org/) gets a lot of traction and notice, which is right, but setting it up for a simple blog could be a bit too much. Next.js provides a simple [RESTful](https://restfulapi.net/) API for your front-end to consume. No fancy techniques here, but an easy-to-use API.

      ### Going serverless

      Just like the way Next.js can render pages with the [serverless]([https://aws.amazon.com/serverless/](https://aws.amazon.com/serverless/)) approach, it can render API routes using serverless functions. This is great as you can easily scale your functions and implement caching. An added benefit is that if you already set this up for your pages, your API routes get it for free.

      ## How do they do that?

      Great, I'm interested! What do I have to do? Luckily, the feature is pretty straightforward. You provide functions, Next.js executes them. The API routes are configured the same as done for Next.js pages. For those unfamiliar, let's have a look at how this works.

      ### The Next.js filesystem-based routing

      The system works as follows. You create a folder called pages in the root of your Next.js project. You then add a file called `index.tsx` or `index.js` if you don't use TypeScript. This exports a function that renders some JSX. Next.js, during the build, turns `pages/index.tsx` into `/index.html` following this pattern you can make a file in `pages/about/contact.tsx`. This will be turned into `/about/contact.html`.

      That's not to bad. We can dive one level deeper to make use of dynamic routes. In case of a blog, you don't want to create a file for every blog post. You want to make a route dynamic. Next.js offers a simple solution. Let's say you want to have all articles under `/articles/--SOMETHING--`. You can do this by letting Next.js know that the file should match anything after where we now put `--SOMETHING--`. We do this by creating the following file: `pages/articles/[slug].tsx`. This works for folder names as well. Now, when we go to `/articles/next-js-api-routes` it will load that file and pass what the slug was. In this example is use the key slug, but you can use anything you want.

      ### Using this pattern for the API

      We start with creating a folder called api in pages. We can then follow the same pattern as for regular pages. For example, `pages/api/articles/[slug].tsx` will turn into `/api/articles/next-js-api-routes` with one distinction. It will not render a page, but return a response as it knows that anything under `/api/` is not a page but an API route. More then likely, this response will be JSON.

      ### The req/res pattern

      Great, so we created a file in `pages/api/articles/[slug].tsx` but how do we handle the request and send a response? The function receives two parameters, res and req that you can use to handle the response. The req object contains all the information about the request. You could, for instance, get the value for the slug here. The res object will be used to return a proper response. This response should contain the following:

      * a statuscode (e.g. `res.statusCode = 200`)

      * a header for the type of content you are sending back (e.g. `res.setHeader('Content-Type', 'application/json'`)

      * the actual data (e.g. `res.end(JSON.stringify(article))`)


      What you send back depends on where your data is stored of course. In case of an error, you might want to send back some error messages. To do all of this, I created two small helper functions:

      ```

      const errors = {
          default: 'A server error occurred',
          notFound: 'Document not found',
          notImplemented: 'Request handling not implemented'
      }


      export const errorHandler = (res: any, response: { status: number, error: string, message?: string } = { status: 500, error: 'default' }) => {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ...response, message: response.message || (errors[response.error] || errors.default) }));
      }


      export const successHandler = (res: any, response: any = {}) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response));
      }

      ```

      ## When/why should I use them?

      This is great if you require an API but don't want to host a separate API server somewhere. It bundles your entire application in one neat package. There are however more advantages you get right out of the box which made me switch to this in the first place.

      ### CORS

      Out of the box, the API will only be callable from your domain where you are running the Next.js application. This ensures that nobody from the outside world can access your API from their application or script. Heads up, you can't just call `/api/*` from your application. You always need to have the domain in there as well. A quick solution to this is to call ``${window.location.origin}/api/*``.

      ### Private API keys

      The main reason I looked into Next.js API routes was to hide my API keys. For a project, I was using Firebase for storage. I didn't want to expose my keys to the public. With private keys with Next.js, I was able to hide those and just let them be present on the API server.

      ### Middleware

      Finally, Next.js makes it easy to apply your middleware. You might want to consider this when working with authentication and roles. For example, you can shield of certain request for just administrators.

      ## That's it

      So, looking back, we can now easily create our own secure and scalable API without the hassle of setting up another service. Everything lives nicely together in one package. If you ever wanted to look into building your API or proxy I highly recommend checking this feature out. If you are interested to read more about Next.js, I suggest to read [Implementing the latest web technologies to boost the Mirabeau blog](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies).
    date: 2020-08-14T00:00:00.000Z
    slug: next-js-api-routes
    tags:
      - api
      - next-js
      - react-js
    intro: >-
      Next.js is my framework of choice for any React.js application I develop. One of the big features I haven't covered before is Next.js API routes. Although not as big of a feature as page generation, it is one of the features I'm starting to enjoy more and more. Let's have a look at this feature and how to use it.
    teaserCopy: >-
      Next.js is my framework of choice for any React.js application I develop. One of the big features I haven't covered before is Next.js API routes. Although not as big of a feature as page generation, it is one of the features I'm starting to enjoy more and more. Let's have a look at this feature and how to use it.
    teaserImage: /img/articles/next-js-api-routes.jpg
    title: Next.js API routes
  - type: articles
    body: >-
      ## Disclaimer: I love native apps

      This is not an "I develop for the web, so the web is the best" type of article. I love native apps. The user experience is often better than their web counterparts. This becomes apparent in, for instance, eCommerce websites. Often, they feel bloated, sluggish and don't provide the same 'feel' and functionalities as the native variant.

      ## So, why go for web apps?

      I strongly believe that web counter-parts can be equally as good, if not better. The reason why I love the web so much is due to its accessibility. If developed well, the web is accessible on every device with a web browser.

      I have a top-of-the-line tablet that's about 3 years old. It's well performant, receives frequent updates and runs very well. You'd say I'll be able to run new apps. Well, no. I quite often am not able to download or view an app because of three possible reasons:

      ### "This item isn't available in your country"

      I live in the Netherlands. Generally, we are on pretty much good terms with any country of legislation. Sure, web apps can be blocked as well in certain countries for several reasons, but generally, it is accessible. Why can't native apps be?

      ### "This app is not optimized for your device"

      Why? The hardware is capable, the OS is up to date. This is a problem that the web inherently doesn't have. If built well, the web apps scale to every resolution and offer a working solution through 'progressive enhancement'.

      ### "Only for iOS"

      This one gets me more than anything. Often, new applications are just available for one OS and sometimes even starting from a specific version. This excludes a large number of potential users just because they don't have the specific OS and version you support.


      ![This item isn't available in your country.](/img/articles/app-unavailable.jpg)*This item isn't available in your country.*


      ## Can it provide the same features of native apps?

      So, the web has these upsides, but can it provide the same features of native apps? If not, though luck. Well, it will surprise you how much the web can do and provide. Let's go over a few.

      ### Performance

      One of the big issues I have with web apps that drive me to their native counter-parts is performance. This is the responsibility of the developers. For the sake of the argument, let's take two types of applications.

      #### eCommerce

      There is no, and I repeat, NO excuse for sluggish eCommerce web apps in this day and age. There is a wide variety of tools for developers to build highly performant web apps. For example, a big issue with web apps is the use of front-end SPA frameworks like [React.js](https://reactjs.org/). Although build for fast web apps, it contributes to one of the biggest factors of sluggish websites which are resources. The bundle that needs to be loaded can be quite big. This issue is however solved with frameworks like [Next.js](https://nextjs.org/). You can read more in my article on [Implementing the latest web technologies to boost the Mirabeau blog](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies). Combine this with caching of data and you go a long way in building a performance eCommerce web app.

      #### Intensive games

      This is where native apps are better suited on first sight. The native app can make use of all the hardware possibilities of the device and ensure great performance. The web is getting better at this through techniques like [WebAssembly](https://webassembly.org/) can solve many issues.

      ### Offline support

      [Progressive Web Apps](https://web.dev/progressive-web-apps/) (PWA) and more explicitly [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). bring offline support to the web. This ensures that, like native apps, PWas can always be loaded, cache resources and offer functionality even without an active internet connection.

      ![Twitter PWA](/img/articles/twitter-pwa.jpg)*Twitter PWA*

      ### Home screen presence

      The great thing about native apps is the presence on the home screen. It is easy for users to come back to the application when they need to. It takes a bit more effort to open a browser and then go to the web app. PWAs solve this problem. One of the core functionalities is to allow the user to add the PWA to their home screen.

      A great bonus is to be able to install the PWA to desktops as well to run as a destop app.

      ### Omni-platform by default

      Native and web apps run into the same issues regarding OS (and browser). There is no way around this, but the web has a big advantage over native. Even though the user might use a different OS or browser than others, it will still be able to use the code you wrote. This is possible for native apps by using something like React Native or by wrapping a web app in a shell for native. Being able to have a Omni-platform app out of the box is a great way to ensure accessibility for every user.

      ### iOS App Store/Google Play store/Windows store presence

      One of the lesser know features of PWAs is the ability to add your app to the iOS App Store/Google Play store/Windows store. This opens up a whole way to be discovered by potential users. For a more detailed look head over to [this](https://www.freecodecamp.org/news/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned-7cb3f56daf9b/) article explaining the possibilities and experience.

      ![Twitter PWA in Google Play Store](/img/articles/twitter-google-play-store.jpeg)*Twitter PWA in Google Play Store*

      ### Version updates

      One of the downsides I see with native apps is the requirement to first install and then keeping the app up to date. Again, this is inherently not an issue with the web. Releasing an update will always be immediately available to the user.

      ### Notifications

      Another great possibility of native apps is notifications. This feature is immensely valuable to trigger users to use your app. This, again, is supported when using PWAs. Obviously, like native apps, this should be used unobtrusively.

      ### And more

      You get the picture by now. The web offers many of the functionalities that native does and brings more upsides to the table. Things like splash screens, BlueTooth support, webcam access and more are available in the browser. The web is one mighty machine.

      ## Successful web apps are not just about technological possibilities

      That was a lot of technical information, but let's step back a bit and look at the 'look and feel'. Often, web apps are turned into PWAs on a technical level. Although this is a good start, there is a big part we aren't covering yet. The look and feel of a native app versus a web app are immense. Besides platform-specific styles and interaction patterns, there is a fundamentally different design pattern.

      Native apps don't scroll. Well, they do, but very specific. On the web, it is custom to have multiple sections on a page. You might have a header, latest posts, a contact form and end with a footer. Native apps do have this sometimes, but mostly 'tuck away' sections. Generally, lists and content are scrollable. Forms and other standalone sections are often available after a user interaction on, for instance, a button.

      ![Load flow with app shell](/img/articles/appshell.png)*Load flow with app shell*

      Next to this, native apps often have a shell with a top- and bottom bar with a place for the content in the middle. This 'shell' is always available and loaded first. Content will be loaded second.

      Naturally, there is way more that goes into designing an app versus a website, but this exemplifies how crucial the design is when building a PWA.

      ## Which companys use PWAs?

      A lot actually. Here are some of the examples companies that use PWAs:

      * Starbucks

      * Housing.com

      * Digikala

      * Flipboard

      * Soundslice

      * 2048 Game

      * MakeMyTrip

      * Uber

      * Padpiper

      * Pinterest

      * Yummly

      * Spotify

      ## Which one should I choose and don't say "it depends"?

      It depends. If the functionalities are available for the web, definitely! As I just mentioned, the web offers many advantages over native apps while offering many of the same functionalities. If you need that native app, go for that.

      My goals are not to push web apps over native apps in some 'platform war'. Be open-minded for both and be up to speed with the possibilities. In the end, our goals should be to offer the user with the best product. Personal preference or other peoples opinion matter, but are not leading. With both platforms, there is only one question you should ask yourself.

      > How can I help the person using this in the best way?
    date: 2020-06-12T00:00:00.000Z
    slug: you-might-not-need-a-native-app
    tags:
      - pwa
      - native
      - spa
    intro: >-
      "We need a native app for performance, the 'feel', offline functionalities, notifications and...". Native apps have provided fundamental functionalities that serve the purpose of creating a wonderful user experience. But, you might not need that native app and opt for the technology of the wondrous web!
    teaserCopy: >-
      "We need a native app for performance, the 'feel', offline functionalities, notifications and...". Native apps have provided fundamental functionalities that serve the purpose of creating a wonderful user experience. But, you might not need that native app and opt for the technology of the wondrous web!
    teaserImage: /img/articles/pwa-vs-native.png
    title: You might not need a native app
  - type: articles
    body: >-
      ![Number Code Input](/img/articles/number-code-input-html-css-js.gif)*Number Code Input*

      As you can see, the core functionality of these inputs is to enter one number at a time. The building of that happy flow can be quite easy to do. When playing around we can see that there a quite a few more functionalities. Let's first set the requirements:

      The Number Code Input should:

      * automatically move to the next and stop at the last number input

      * navigate from left to right with the arrow keys

      * delete a single value in input and automatically going back to and delete the value of the previous input when hitting the backspace key

      * delete the value of a focussed and previous input if backspace is pressed multiple times

      * handle the pasting of several/all numbers in a number input

      You see, this is quite a bit of functionality. As always, I will build this custom input in a progressively enhanced way on three levels. Please read more about this in my blog ["Writing progressively enhanced custom inputs for the web"](https://www.davebitter.com/articles/custom-inputs-web).

      ## Structural (HTML)

      ![Number Code Input with HTML](/img/articles/number-code-input-html.gif)*Number Code Input with HTML*


      ```html

      <fieldset name='number-code' data-number-code-form>
          <legend>Number Code</legend>

          <input type="number" min='0' max='9' name='number-code-0' data-number-code-input='0' required />
          <input type="number" min='0' max='9' name='number-code-1' data-number-code-input='1' required />
          <input type="number" min='0' max='9' name='number-code-2' data-number-code-input='2' required />
          <input type="number" min='0' max='9' name='number-code-3' data-number-code-input='3' required />
          <input type="number" min='0' max='9' name='number-code-4' data-number-code-input='4' required />
          <input type="number" min='0' max='9' name='number-code-5' data-number-code-input='5' required />
          <input type="number" min='0' max='9' name='number-code-6' data-number-code-input='6' required />
          <input type="number" min='0' max='9' name='number-code-7' data-number-code-input='7' required />
      </fieldset>

      ```

      Let's start with the structure. As you might have read in the article I mentioned, I need to provide a working HTML version first. The Number Code Input will consist of a fieldset containing all the separate number inputs. The fieldset is used to indicate that these inputs belong together. With the `legend`, I indicate what this group is.

      The inputs itself have a few needed attributes. Firstly, I declared that the input type must be a number. This is not just for validation but triggers the [number keyboard layout](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs) on devices. This increases the user experience. Next to that, I've added a `min` value of 0 and a `max` value of 9. I did this so you can only enter a single number character per input. You might see some attributes like `data-number-code-input`. This has no function right now but will be used later on by the JavaScript.

      Great, the Number Code Input now allows for numbers being entered by the user. Let's proceed to the next step.

      ## Presentational (CSS)

      ![Number Code Input with HTML and CSS](/img/articles/number-code-input-html-css.gif)*Number Code Input with HTML and CSS*

      ```css

      legend {
        font-size: 0;
      }


      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }


      input[type=number] {
        -moz-appearance: textfield;
      }

      ```

      Naturally, the style of the inputs is up to you. I did add a few things, besides nice visuals, to make the form a bit better. I set the `font-size` of the legend to 0 as visually we don't need it, but for screenreaders, we want to have that information available. Next to that, I hid the arrows in the input field as I did not find it needed in my use case. This is, of course, up to you.

      The Number Code Input is starting to look a lot better. Now let's add some interactivity.

      ## Behavioural (JavaScript)

      ![Number Code Input with HTML, CSS and JS](/img/articles/number-code-input-html-css-js.gif)*Number Code Input with HTML, CSS and JS*

      Let's take the behavioural layer one requirement at a time.

      ### Automatically move to the next and stop at the last number input

      I need to add some logic to call focus on the next number input if the case that the current number input is not the last one

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleInput = ({target}) => {
        let currentIndex = Number(target.dataset.numberCodeInput);
        const nextIndex = currentIndex + 1;

        if(nextIndex < numberCodeInputs.length) {
          numberCodeInputs[nextIndex].focus();
        }
      });

      ```

      ### Navigate from left to right with the arrow keys

      I need to add an event listener that triggers when a key is pressed. I then focus on the next or previous number input if there is one.

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleKeyDown = e => {
        const {code, target} = e;

        const currentIndex = Number(target.dataset.numberCodeInput);
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        const hasPreviousIndex = previousIndex >= 0;
        const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

        switch(code) {
          case 'ArrowLeft':
          case 'ArrowUp':
            if (hasPreviousIndex) {
              numberCodeInputs[previousIndex].focus();
            }
            e.preventDefault();
            break;

          case 'ArrowRight':
          case 'ArrowDown':
            if (hasNextIndex) {
              numberCodeInputs[nextIndex].focus();
            }
            e.preventDefault();
            break;

          default:
            break;
        }
      }


      numberCodeForm.addEventListener('keydown', handleKeyDown);

      ```

      ### Delete a single value in an input and automatically going back to and delete the value of the previous input when hitting the backspace key

      This functionality is pretty straight forward. I delete the value of the focussed number input and focus the previous number input if present.

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleKeyDown = e => {
        const {code, target} = e;

        const currentIndex = Number(target.dataset.numberCodeInput);
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        const hasPreviousIndex = previousIndex >= 0;
        const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

        switch(code) {
          case 'Backspace':
            if (!e.target.value.length && hasPreviousIndex) {
              numberCodeInputs[previousIndex].value = null;
              numberCodeInputs[previousIndex].focus();
            }
            break;
          default:
            break;
        }
      }


      numberCodeForm.addEventListener('keydown', handleKeyDown);

      ```

      ### Handle the pasting of several/all numbers in a number input

      Finally, when pasting a value of multiple characters I want to automatically fill out the number input based on that value. This is important as this is a common way people fill out these forms.

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleInput = ({target}) => {
        const inputLength = target.value.length;
        let currentIndex = Number(target.dataset.numberCodeInput);

        if (inputLength > 1) {
          const inputValues = target.value.split('');

          inputValues.forEach((value, valueIndex) => {
            const nextValueIndex = currentIndex + valueIndex;

            if (nextValueIndex >= numberCodeInputs.length) { return; }

            numberCodeInputs[nextValueIndex].value = value;
          });

          currentIndex += inputValues.length - 2;
        }

        const nextIndex = currentIndex + 1;
      });

      ```

      ## Looking back

      That's it. I build a progressively enhanced Number Code Input that deals with the several requirements we set. Feel free to have a look over at [CodePen](https://codepen.io/davebitter/full/VweaZqY) to play around with the Number Code Input and look further into the source code.

    date: 2020-06-11T00:00:00.000Z
    slug: number-code-input
    tags:
      - prototype
      - progressive-enhancement
    intro: >-
      I often come across Number Code Inputs on various websites used for security measures, voucher codes and more. These Number Code Inputs often have a bit more functionality behind them then you might think at first. Let's create our own as an exercise.
    teaserCopy: >-
      I often come across Number Code Inputs on various websites used for security measures, voucher codes and more. These Number Code Inputs often have a bit more functionality behind them then you might think at first. Let's create our own as an exercise.
    teaserImage: /img/articles/number-code-input.jpg
    title: Building a Number Code Input
  - type: articles
    body: >-
      ## The issue with SEO in SPAs

      The issue with SEO in SPAs has to do with where the page gets built or rendered. The rise of client-side SPA frameworks like [React.js](https://reactjs.org/), [Vue.js](https://vuejs.org/) and others caused an issue I didn't encounter before with server-side frameworks.

      In short, there are two ways of rendering a page. Traditionally, the page gets rendered on the server. As a result, bots like [GoogleBot](https://yoast.com/what-is-googlebot/) will visit your page, read the content and [meta tags](https://www.webpresencesolutions.net/metadata-meta-tags-web-page-titles-page-descriptions-explained/) of the page and use that information for Googles search engine. SPA frameworks work a little different. Normally, a blank page is loaded. The framework will build the entire page client-side as soon as the JavaScript bundle is loaded. Besides potential performance issues, this raised a new problem. Bots will visit a page, find a blank page and return that information.

      ## So is Google just ignoring this?

      Nope, they are trying their best to deal with this issue. As you can read [here](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html), Google can execute JavaScript to build the page and then get the content and metadata. So, problem fixed? Well, not entirely. They mention that _sometimes things don't go perfectly during rendering, which may negatively impact search results for your site_. Google is providing tools for you to debug and see what causes issues.

      > Building applications for the web is hard enough.

      ## Do I want to deal with this?

      Well, no. Building applications for the web is hard enough. At the start, I mentioned that I wanted to solve this issue with modern tools and techniques I love to use. Let's pick React.js as the SPA framework. I love to use React.js in combination with [Next.js](https://nextjs.org/) to solve many of the issues with SPA frameworks. You can read up on that in my article on [Implementing the latest web technologies to boost the Mirabeau blog](/articles/mirabeau-blog-latest-web-technologies).

      ![React.js and Next.js](//images.ctfassets.net/w4dg3cjf42ew/5JdNrYGW2SBKmIoT38kqz0/80b019ca3d6e00871b3603f842814b0c/CDFEF415-123A-4D0E-85AD-BB3B32A0B3A1-min.png)*React.js and Next.js working together*


      I will leverage the solution that Next.js offers regarding server-side rendering. This solves the issue in the old fashioned way. The page will be rendered on the server, GoogleBot will get the content and metadata and I will have solved my problem.

      ## Taking it a bit further

      I can call it a day now, but let's look at how I took it a bit further when building the  the [Mirabeau blog](blog.mirabeau.nl). The content, [semantically written](https://html.com/semantic-markup/), is received by the GoogleBot. The metadata implementation needs to be done by me. In theory, it is simple. I have a set of [basic meta tags](https://support.google.com/webmasters/answer/79812?hl=en) that I update for every page. An article page may use the title and description of the article while the home page uses the name of the blog and the tagline.

      In the case of Next.js, I load a component called `SiteMeta` the head element of the page using the Next.js `head` component like so:

      ![Simplified code snippet of loading SiteMeta component](//images.ctfassets.net/w4dg3cjf42ew/1ux4A6clBzDNpDdqYdoc7I/a8cd4433d13cb83b6e822f057bd2a968/meta-tags.png)*Simplified code snippet of loading SiteMeta component*

      For an article, for instance, I set the title tag to the title of the article. I then load the `SiteMeta` component that sets a couple more tags. This is already starting to look more like it. The meta tags are being added dynamically based on the article and locale. Here you can see a simplified version:

      ![Simplified code snippet of SiteMeta component](//images.ctfassets.net/w4dg3cjf42ew/4RkWDgVEekZ7QlDK2CxE6A/7a00962575163a0ebadabbbdcf3418f1/site-meta.png)*Simplified code snippet of SiteMeta component*

      ## Taking it even further by taking social media into account

      Social media is vital for the reach of your blog. Naturally, we need to spend some time here to have the best chance of getting people to click the link to the article.

      ### OpenGraph

      I can specify the page even further by using standards with [Open Graph](https://ogp.me/). It’s a protocol that is widely supported by all major social media websites and crawlers. I use Open Graph to create semantical tags for SEO and sharing. For example, I can provide a title, image and summary for an article page specifically aimed towards social media sites. I now load a second component called `SiteOpenGraphTags` in the head element.

      ![Simplified code snippet of loading OpenGraphTags component](//images.ctfassets.net/w4dg3cjf42ew/7b71NBLQBlK5VK9x0nPcEn/36b05ab8de8b8ed3b10078f091bd2e87/open-graph-tags.png)*Simplified code snippet of loading OpenGraphTags component*

      Here we can set additional tags according to the Open Graph specification. Below you find a simplified version that for instance sets tags specific for [Twitter cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started).

      ![Simplified code snippet of OpenGraphTags component](//images.ctfassets.net/w4dg3cjf42ew/6RHSmvijxYUhoyYCaBMysX/9bf84bed3b1183bb029536532b786bf2/site-open-graph.png)*Simplified code snippet of OpenGraphTags component*

      ## The result

      When I share an article to social media I can now see that it shows a custom title, description and image that I can set in the CMS used. A social media card might look something like:

      ![Mirabeau blog social card example](//images.ctfassets.net/w4dg3cjf42ew/6tAjqUcClkipkwktwCRzhY/3252230919b7c43d4070cf55adccea10/mira-blog-seo.jpg)*Mirabeau blog social card example*

      ## Case: Lely Used

      Sure, a blog is relatively simple. Often, we need to put in a bit more work. [Lely used](https://used.lely.com/en/why-used) is a platform I build similarly. The platform consists of 'content pages', a product search page and product detail pages. The goal is to sell products. As a result, detail pages are often shared on social media platforms. The implementation for many of the pages is the same, but as an article page on a blog, there is a product page on an e-commerce platform. I looked into setting dynamic tags specific to a product. Below you can see the response of a product detail page.

      ![Lely Used social card example](//images.ctfassets.net/w4dg3cjf42ew/2SsaB4tQB3QXMmenbqmonb/9249a5987f901dbe43df60740484307d/lely-used-seo.jpg)*Lely Used social card example*

      I've added quite a bit of information in this card. You can see the:

      - platform

      - model

      - location

      - build-year

      - localised currency and amount (price)

      - specifications

      - image of product

      - content localised based on locale in link

      These tags are being used both for sharing the product and by bots like GoogleBot.

      ## Looking back

      SPA frameworks have an impact on SEO. Although Google is working hard an this, there are still several issues. I can solve all issues by using server-side rendering with a framework like Next.js. I can use React.js to dynamically load regular meta tags and Open Graph tags in the head element of the page. I can then fully customise the tags based on the what kind of page it is. This is my current way of handling SEO with SPA frameworks. What is yours?

    date: 2020-03-31T00:00:00.000Z
    slug: spa-seo
    tags:
      - seo
      - spa
      - next-js
    intro: >-
      One of the biggest drawbacks when building a Single-Page Application (SPA) is to provide solid Search Engine Optimisation, often shortened to SEO. How can we improve SEO with some modern tools and techniques I love the most and use in my daily work as a front-end developer? Read more about it in this blog.
    teaserCopy: >-
      One of the biggest drawbacks when building a Single-Page Application (SPA) is to provide solid Search Engine Optimisation, often shortened to SEO. How can we improve SEO with some modern tools and techniques I love the most?
    teaserImage: /img/articles/dave-seo.jpg
    title: How can I handle SEO in my Single-page application?
  - type: articles
    body: >-
      Back in 2018, Mirabeau updated their main website [mirabeau.nl](https://mirabeau.nl). However, the old blogging platform became the sibling that was left behind. The branding and visual style got severely updated and as you might know, the world of (front-end) development moves at a rapid pace. Projects that are about five years old become outdated both in tooling and functionality. I want to rethink the way we build web platforms and construct a stack that stays up-to-date and is resilient for the coming years.


      ![The old blog](//images.ctfassets.net/w4dg3cjf42ew/5vXCgxn6BTCy8jqrjMiLXf/2db1ca51a38df55e69951346ab28abbc/49D97C22-25AD-4F85-862D-E6C93A006EE6-min.png)*Our aged blog platform*


      ## The new blog platform

      The biggest difference between [the new blog platform](blog.mirabeau.nl) – compared to the old – is the unified visual language. I took, in close collaboration with the visual designers, elements of the main Mirabeau website to use in the platform. Examples are the page scroll effect and the blog cards. Combining that with the corporate identity ensures a unified look & feel.

      The second major improvement is the overall ease of use. For example, you are now able to scan more quickly over the page to find an article of your interest. I implemented this by proving a teaser image and a summary of the blog. This gives authors more room to make a scannable summary of their post.


      ![The new Mirabeau visual branding](//images.ctfassets.net/w4dg3cjf42ew/36VJWDKG568fiDIAdv9Gpg/39118b835a3f11b5d59c8bcde0ee8d66/B323160D-6A46-4AD2-A48C-1FEF85BBF506-min.png)*The updated branding and visual language*


      ### Solving issues with Single Page Applications (SPA)

      Every once in awhile I see techniques or frameworks that truly excite me. The foundation of this platform is built on one of those. The platform is built in [React.js](https://reactjs.org/) with the full power of [Next.js](https://nextjs.org/).

      At Mirabeau, there are two main ways of building the front-end for a website. They either use their [front-end boilerplate](https://github.com/mirabeau-nl/frontend-boilerplate) for setting up a component library/design system and static websites or they use React.js to build more interactive heavy web applications. React.js comes with a few big downsides that you need to take into account. The reason Next.js excites me so much is that it solves many of the issues.

      The biggest drawback is the lack of server-side rendering (SSR) capabilities when using React.js or any other SPA. In short, you load a blank page and a JavaScript bundle. After loading the bundle, the page is built in the browser and the user can use the application.

      This has multiple implications like:

      * 1.  __Performance__: The page needs to load a - in most cases large -
      JavaScript bundle to be able to render the first view. Often, you then
      need to get some data - like a blog post - from a server. This then gets
      retrieved and rendered on the page. By utilising SSR, we can do all of
      this just on the server.

      * 2.  __Providing SEO__: SEO is an important factor for many types of websites like the Mirabeau blog platform. Firstly, I wanted to provide robots/crawlers from Google to properly index our pages. Secondly, I wanted social media platforms to be able to create links with images, titles and summaries.

      * 3.  __Building through progressive enhancement__: At Mirabeau, they build websites through progressive enhancement. Unfortunately, you need JavaScript for a React.js website. We can use SSR to provide the platform without having JavaScript in the browser.


      ![React.js and Next.js](//images.ctfassets.net/w4dg3cjf42ew/5JdNrYGW2SBKmIoT38kqz0/80b019ca3d6e00871b3603f842814b0c/CDFEF415-123A-4D0E-85AD-BB3B32A0B3A1-min.png)*React.js and Next.js working together*


      ### Serverless architecture

      Next.js provides a couple of ways to run your platform. You can run your platform with a [Node.js server](https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f/), generated as a  [static site (SSG)](https://nextjs.org/learn/excel/static-html-export)or [ serverless](https://serverless.com/blog/serverless-nextjs/). I decided to go with the latter for a few reasons. As the content might update frequently, a statically generated website requires rebuilds of pages when their content changes. This leaves me with Node.js and serverless. Serverless is the right choice with regards to costs, scalability and speed. More details later on in this story.

      ### Increasing engagement with custom SEO

      SEO is an important aspect of any website, but even more for a blog platform. I dove into how I could leverage this for this platform.

      * 1.  __Creating dynamic tags__. Fortunately, Next.js provides a Head component to let you dynamically add nodes, like tags for SEO, to the head of the page. I use this to load page-specific tags dynamically per page.

      * 2.  __Using standards with [Open Graph](https://ogp.me/)__. It’s a protocol that is widely supported by all major social media websites and crawlers. I use Open Graph to create semantical tags for SEO. For example, I was able to provide a title, image and summary for an article page.

      * 3.  __Custom tags for social sites__. By default robots or crawlers of websites like Facebook, LinkedIn and Twitter will try to get this information out of your website. I want to allow authors to have full control over this. In the CMS the author can give a specific image and summary for their article. This then dictates how it looks like when shared on social media sites. This gives more fine-grained control over this.

      * 4.  __Extending tags in a smart way__. Even though I want to give this fine-grained control to the others, I don't want them to worry about it. I wrote a small algorithm that takes a set of base tags for the entire blog platform and extends them based on the type of page. This ensures good SEO while taking away the work for authors.

      ### Utilising a serverless architecture

      I want to dive a bit deeper in the serverless architecture that is used for this blog platform. This is the biggest difference, technology-wise next to React.js, compared to the old platform.


      ![The Serverless Framework with Next.js](//images.ctfassets.net/w4dg3cjf42ew/6m51INzwmzmJr4Z25pfInu/52550162034fa24e94687be53e931e2c/serverless_nextjs_blog_header-min.png)*The Serverless Framework with Next.js*


      * 1.   __‘Zero’ configuration__. Configuring and deploying a fully serverless architecture can become quite difficult. For this reason, I decide to make use of the [Serverless Framework](https://serverless.com/). This allows me to get up and running relatively quickly. It simplified the configuration and deployment aspect.

      * 2.  __Next.js__. I use the [Serverless Next.js plugin](https://serverless.com/blog/serverless-nextjs/). This plugin takes the rest of the heavy lifting. It is exactly tailored to deploying a Next.js project with serverless and lambdas.

      * 3.  __Cloud services__. I decided to use AWS, where we host many services, to deploy the serverless platform on. Below you can see the architecture that I use.


      ![New Mirabeau blog platform architecture on AWS](//images.ctfassets.net/w4dg3cjf42ew/1C35P7AAsdhPyE87h90fEi/269e6dc99c0c03cc79adbed078f7e240/serverless_nextjs_lambda_edge_aws_architecture-min.png)*The new Mirabeau blog platform architecture running on AWS*


      ### Cloud Services

      A comprehensive overview of AWS services used for the new platform:

      * 1.  __CloudFront__. Amazon CloudFront speeds up the distribution of static and dynamic web content to users. Making use of S3 buckets for static files and Lambda at edge to render the requested page server-side.


      * 2.  __S3__. Amazon Simple Storage Service (S3) is storage designed to make web-scale computing easier for developers. It is utilised to serve the images, CSS and JavaScript.

      * 3.  __Lambda@Edge__ lets you run Node.js and Python Lambda functions to customize content that CloudFront delivers by executing the functions in AWS locations near the user. This results in a faster page load, in general, for every user all over the world.


      ![Lamda](//images.ctfassets.net/w4dg3cjf42ew/7uRaMDjuA7iS9kjLEau6Bm/48ef2eb84b38b9fc1314b427a523713d/cloudfront-events-that-trigger-lambda-functions-min.png)*A typical request going through AWS CloudFront*


      ### CI/CD with pipelines

      Finally, I added CI/CD through pipelines. I do this for a few reasons. I want to ensure that all front-end developers can collaborate on this platform by quickly cloning the repository, make changes and roll out an update through the pipelines. Next to that, I want to ensure that everybody that I allow through the repository rights and access configuration, can deploy without creating their own AWS accounts and keys. This all ensures a nice developer experience.


      ![CI/CD](//images.ctfassets.net/w4dg3cjf42ew/KZlhxIeJqB8y7l954ixcm/04acb40e87638f9dbfed747370ba32aa/diagram-cicd-horizontal-85f50f218b3ff47fd993ab5529b85f0147901b20f18b972fdc48504e4bc3110e-min.png)*Two ways of CI/CD*


      ## The new front-end toolbox

      Let’s take a step back and look at what a front-end developer in 2020 can do. It is a great time for front-end developers to experiment with different areas of the process of building a platform. With Next.js I was able to, relatively easy, add SSR through Lamdas. With the Serverless framework and the Serverless Next.js plugin, I was able to configure and deploy the full architecture to AWS. Finally, with pipelines I was able to implement CI/CD.


      Naturally, there are more tools out there, but this platform attests to the fact that we become increasingly more powerful as front-end developers nowadays. We can build great things with the assistance of the mentioned tools. We can, once again, focus on creating!
    date: 2020-02-03T00:00:00.000Z
    intro: >-
      The Mirabeau blog was suffering from technical debt. I decided to rebuild it using
      the latest web technologies to make it 2020 ready, which includes boosting
      the overall performance and user-friendliness. This blog post is about the
      journey I went and what the possibilities might be for your next platform.
    slug: mirabeau-blog-latest-web-technologies
    tags:
      - next-js
      - react-js
      - serverless
    teaserCopy: >-
      The Mirabeau blog was suffering from technical debt. I decided to rebuild it using
      the latest web technologies to make it 2020 ready, which includes boosting
      the overall performance and user-friendliness.
    teaserImage: /img/articles/dave-behind-laptop.jpg
    title: Implementing the latest web technologies to boost the Mirabeau blog
  - type: articles
    body: >-
      ### Progressive enhancement

      Progressive enhancement is a technique we use to enhance an element when the user’s browser has certain functionalities. By far, the biggest part of progressive enhancement is enhancing elements when CSS and JavaScript are available.

      The technique is simple. First, built the HTML to always offer a working solution. Then add CSS to make the element more visually appealing. Finally, add some JavaScript to enhance the user experience by adding custom interactivity.

      ### Progressively enhanced custom inputs

      So, how to deal with custom inputs? For example a custom three-way switch shown below.

      ![Three way switch with HTML, CSS and JavaScript](//images.ctfassets.net/w4dg3cjf42ew/1zNvSfEft1nLo19YjfNUZz/e3f4e68aa0c8133ba17042ad2514963e/html_css_js.gif)

      First, break down the functionality the input requires. As a user, you have three choices. We indicate with a color whether the value is active (green), inactive (red) or no preference (grey). The input will have to animate between the options as well.

      ### HTML

      First start with the HTML. There are three options the user can select and only one option can be selected at a time. This is a perfect use case for HTML radio inputs. Let’s write that first.

      ```html

      ...

      <form>
        <fieldset>
          <legend>Would you like to receive news updates?</legend>
          <div>
            <div>
              <input id='inactive' type='radio' name='email-preference' />
              <label for='inactive'>No</label>

              <input id='no-preference' type='radio' name='email-preference' checked />
              <label for='no-preference'>No preference</label>

              <input id='active' type='radio' name='email-preference' />
              <label for='active'>Yes</label>
            </div>
          </div>
        </fieldset>
      </form>

      ...

      ```

      ![Three way switch with HTML only](//images.ctfassets.net/w4dg3cjf42ew/1ZF5ZS5RboxdmcDA8Q3w1S/2a6c6e530c46eb96b90ff853f7d459ca/html.gif)

      ### CSS

      I can add styling to make it look like the design with the HTML in place. So I first add some needed wrapping `div`s and classes to the existing HTML for the CSS.

      ```html

      ...

      <body data-has-js='false'>
        <form>
          <fieldset>
            <legend>Would you like to receive news updates?</legend>
            <div class='switch-wrapper'>
              <div class='switch'>
                <input id='inactive' class='switch__input' type='radio' name='email-preference' />
                <label for='inactive' class='switch__label'>No</label>

                <input id='no-preference' class='switch__input' type='radio' name='email-preference' checked />
                <label for='no-preference' class='switch__label'>No preference</label>

                <input id='active' class='switch__input' type='radio' name='email-preference' />
                <label for='active' class='switch__label'>Yes</label>

              </div>
            </div>
          </fieldset>
        </form>
      </body>

      ...

      ```

      After this, add CSS to style the input to look like the proposed design. Then hide the labels for the inputs because you can now use CSS to indicate the chosen value. The below sample uses SCSS, a pre-processor for CSS.

      ```css

      ...

      .switch__input:checked {
        background-color: var(--color-white);

        &[data-state='active'] {
          [data-has-js='false'] & {
            background-color: var(--color-green);
          }
        }

        &[data-state='inactive'] {
          [data-has-js='false'] & {
            background-color: var(--color-red);
          }
        }

        [data-has-js='true'] & {
            background-color: transparent;
        }
      }

      ...

      ```


      As you may have noticed, I have added an attribute to the `body` element to check whether there is JavaScript enabled because some of the styling will just be needed for the non-JavaScript version.

      ![Three way switch with HTML and CSS](//images.ctfassets.net/w4dg3cjf42ew/6YU8CaGMTZWoi1SIjZ9GwI/5ed6143c2c17b8133afe66d45908759a/html_css.gif)

      ### JavaScript

      Lastly, some JavaScript is added to make the full version including an animation and containing all the design.

      I'll first add an HTML element for the, to be animated, active circle that only shows-up when there is JavaScript. I also added a few data attributes to the HTML that will be used as selectors in the JavaScript

      ```html

      ...

      <body data-has-js='false'>
        <form>
          <fieldset>
            <legend>Would you like to receive news updates?</legend>
            <div class='switch-wrapper' data-switch-wrapper>
              <div class='switch'>
                <input id='inactive' class='switch__input' type='radio' name='email-preference' data-state='inactive' data-switch-input />
                <label for='inactive' class='switch__label'>No</label>

                <input id='no-preference' class='switch__input' type='radio' name='email-preference' data-switch-input checked />
                <label for='no-preference' class='switch__label'>No preference</label>

                <input id='active' class='switch__input' type='radio' name='email-preference' data-state='active' data-switch-input />
                <label for='active' class='switch__label'>Yes</label>

                <span class='switch__pill' data-switch-pill />
              </div>
            </div>
          </fieldset>
        </form>
      </body>

      ...

      ```

      With JavaScript, I then indicate that the client has JavaScript.

      ```js

      document.body.setAttribute('data-has-js', true);

      ```

      After that, all I need to do is listen for inputs by the user and animate the active circle to the active input.

      ```js

      // Needed DOM nodes

      const elements = {
        switchWrapper: document.querySelector('[data-switch-wrapper]'),
        inputs: Array.from(document.querySelectorAll('[data-switch-input]')),
        pill: document.querySelector('[data-switch-pill]')
      };


      // Place pill over passed node

      const updatePillPosition = ({target}, animate = true) => {
        const inputIndex = elements.inputs.findIndex(input => input === target);
        const inputState = target.getAttribute('data-state');

        elements.switchWrapper.dataset.animate = animate;
        elements.pill.style.transform = `translate(${inputIndex * target.scrollWidth}px, -50%)`;
        elements.switchWrapper.dataset.state = inputState || 'default';
      };


      // Check for default checked node


      const defaultActiveInput = elements.inputs.find(input => input.checked)


      if (defaultActiveInput) { updatePillPosition({target: defaultActiveInput}, false); }


      // Listen for input events on the nodes

      elements.inputs.forEach(input => input.addEventListener('input', updatePillPosition));

      ```

      And that makes final result! Always consider building progressively enhanced custom inputs for the web that also work in cases where a screenreader (no CSS) is used or JavaScript is not available.

      ![html+css+js](//images.ctfassets.net/w4dg3cjf42ew/5WyKR8vBL5kJXTwbiu8BOF/a97d86a406297f044fb0c80638083bf8/html_css_js.gif)

      ## Final thoughts

      Building in a progressively enhanced way is quite a bit of work. So why is it so important? By writing semantically correct HTML, we offer an accessible website for people who, for instance, use a screenreader. By making it work without JavaScript, we make our website accessible for users that can’t or won’t load JavaScript. Our website will deliver the best possible user experience for every user.

      ## Demo

      You can find the demo and all the code of the three-way switch we worked on over at [CodePen](https://codepen.io/davebitter/full/WNeByaW).
    date: 2019-10-01T00:00:00.000Z
    tags:
      - progressive-enhancement
      - prototype
    intro: >-
      As a frontend developer, I often get designs for custom inputs. These inputs improve usability and user experience. The inputs often require JavaScript to make them work like the designer intended. However, this poses a problem. How can we make custom inputs for the web while still offering a working solution without JavaScript?
    slug: custom-inputs-web
    teaserCopy: >-
      How can we make custom inputs for the web while still offering a working solution without JavaScript?
    teaserImage: /img/articles/progressive-enhancement.png
    title: Writing progressively enhanced custom inputs for the web
---
