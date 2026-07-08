---
type: articles
date: 2026-07-01T00:00:00.000Z
slug: are-ai-tools-making-confirmation-bias-worse
tags:
  - ai
intro: >-
  AI assistants can make confirmation bias feel objective by turning our framing
  into confident-sounding answers.
teaserCopy: >-
  AI assistants can make confirmation bias feel objective by turning our framing
  into confident-sounding answers.
teaserImage: /img/articles/are-ai-tools-making-confirmation-bias-worse-hero.svg
title: Are AI tools making confirmation bias worse?
---
I noticed something recently. I was using an AI assistant to help me think through a technical decision, and at some point I realised I'd been describing the problem in a way that almost guaranteed the answer I already wanted. The AI agreed with me. I moved on.

It took a bit of distance to notice what had happened. I hadn't been asking the AI to help me think. I'd been asking it to confirm what I already thought.

That got me curious. So I went and looked for research.

## It started with search engines

Confirmation bias itself isn't new. Long before AI, researchers were documenting how people search online: we frame our queries to find supporting evidence, not to genuinely explore. We click the first result that confirms what we suspected.

Search engines made this worse through personalisation. Your search history shapes your results, and over time your results reinforce your search history. Eli Pariser called this the "filter bubble" back in 2011. At least with a list of search results, you'd occasionally stumble across something that challenged you, even if you didn't click it.

AI tools change that dynamic. Here's how.

## The friction is gone

With a search engine, there's still some friction in the loop. You get a list of sources. You have to choose. The sources have names and authors you can evaluate. Some might disagree with each other.

With an AI assistant, you get one confident-sounding answer. Framed as a response to your question. Which you framed.

Researchers at SAGE journals called this the "chat-chamber effect" in a 2025 paper: a feedback loop where users treat AI responses as authoritative third-party information, when in reality the model is partly reflecting their own framing back at them. What makes this different from a filter bubble is that users perceive the AI as objective. It's not an algorithm tailored to your history. It's just correct, apparently.

## Sycophancy is a real, measurable thing

LLMs are trained to be helpful and to satisfy users. One consequence of this is something researchers now formally call "sycophancy": the tendency to generate responses that align with what the user seems to want, at the expense of accuracy.

A 2025 study found that simple framing like "I believe the answer is X" induced AI agreement with incorrect beliefs in 63.7% of cases on average, across seven different model families. One model went along with incorrect beliefs in 95.1% of cases under that framing.

OpenAI actually rolled back a model update in 2025 specifically because it had become too sycophantic. The model was agreeing with users so readily that it became a product problem.

There's now quite a bit of academic work on this. Researchers at arXiv published a survey specifically on LLM sycophancy. Another paper traced the behaviour to late-layer neural activations where models override factual knowledge in favour of matching user expectations. It's not a quirk or an edge case. It's a pattern baked into how these models are optimised.

## The coding angle

I work in software, so naturally I went looking for research specific to development workflows.

There's a 2026 paper from arXiv called "Measuring and Exploiting Confirmation Bias in LLM-Assisted Security Code Review" that ran controlled experiments on 250 CVE vulnerability-patch pairs across four AI models. The finding: framing a code change as "bug-free" reduced vulnerability detection rates by 16 to 93 percent, depending on the model and framing condition. You tell the AI the code is fine, it mostly agrees, even when it isn't.

A separate survey found that nearly half of developers don't check AI-generated code, and roughly 38% say it's because reviewing AI output takes longer than reviewing code written by a colleague. That's automation bias: trusting automated systems even when you have reason not to.

The cognitive bias research also found this effect is often stronger in experienced developers than in juniors. Confidence, it seems, makes you less likely to second-guess.

There's also what one paper called the shift from "solution-generative" to "solution-evaluative" work. Coding used to mean generating solutions from scratch. Increasingly, it means reviewing what the AI produced. That sounds like it should create more scrutiny, but evaluating something that sounds authoritative triggers a more permissive cognitive mode than building from nothing.

## Belief offloading

The research I found hardest to shake was a 2025 paper on "belief offloading": the idea that the process of forming and stress-testing beliefs is being outsourced to AI. Studies of university students found that AI tool usage positively predicted epistemic laziness and negatively predicted critical thinking. The paper found a mediation effect, meaning it's not just that incurious people use AI more. The use itself seems to cause a decline in independent reasoning.

Another paper put it this way: users together with AI chatbots become a self-reinforcing epistemic loop, "the ultimate echo chamber." And what's notable is that it argues even ideally rational reasoners are vulnerable to this, not just lazy or uncritical ones. The loop works on you regardless of intent.

## I don't have a strong conclusion here

I started researching this because of a small personal moment of self-awareness, not because I had a thesis to prove. What I found is a body of research pulling in the same direction: AI tools can amplify confirmation bias in ways that are structurally different from, and potentially more stubborn than, what search engines produced.

The mitigations researchers suggest are worth noting. Redacting PR descriptions from AI security review recovered 68.75% of missed vulnerability detections. Explicitly prompting the AI to act as a critic rather than a helper materially changes output. Requiring explicit confirmation before accepting generated code reduces automation bias.

None of those are defaults. Which is kind of the point.

I'm not sure what to do with this beyond being more aware of it. I'll probably keep using AI tools the same way I was before, but maybe with a bit more friction deliberately added in.
