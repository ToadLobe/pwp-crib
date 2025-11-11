# Overview

I am creating an interactive web app using HTML, CSS and Vanilla JS. The purpose of the app is to act as an interactive crib sheet for a PWP (mental health assessor) for use during a psychological assessment. I have attached two files for additional context: one is the official annotated mark scheme for a PWP assessment, and the other is an html version of a Notion file that has been serving as my current crib sheet. This crib sheet has been working okay for me, but I feel an interactive web app would drastically speed up the assessment by funnelling my attention to the correct and relevant questions/information based on previously gathered information. Much of the difficulty in conducting a PWP assessment comes from the fact that I am searching up and down my crib sheet for specific information, having to expand toggles to find relevant wording, and scanning diagnosis tables to make on-the-fly decisions that align with treatment frameworks. This tool is for personal use only.

# Design

The UI is split into a header, a left-hand toolbar, and a main view. The main view is a pageless vertically scrolling list of cards, with each card visually bundling each step of the assessment proccess. Visually, the application should be barebones. No fancy CSS, just a simple dark aesthetic with minimal complexity and styling. For icons, use Tabler icons delivered via CDN. Icons should only be used on buttons, not scattered throughout the application.

## Header

The header contains a stopwatch and two controls to the left (start/pause, reset) and the current patient's name to the right (drawn from the patient name input field, before this is filled just says 'New Patient').

Note that the stopwatch should turn red when it passes 45 minutes.

## Left-hand Toolbar

This sidebar serves several functions. It is an outline of the assessment structure, with a line of text for each section which on pressed scrolls the main view to that section. It also serves as a progress tracker because the text changes from blue to grey and a tick appears next to completed sections.

## Main View

This is where the entire assessment proccess is detailed. Content is seperated into 'cards'. Cards contain four categories of content: 'Direction', which are short written instructions. 'Verbatim', which is a block of text to read out word for word. 'Input' which is a text box or number input field. 'Search' which is a list of predefined values that can be filtered and selected from which will funnel later content.

Note that input feilds and search lists allow for multiple descreet inputs via an 'add' button which are collated in a list of chips below the input. Items from this list can be deleted using a bin icon which appears when a chip is hovered over.

Cards with only instructions and verbatim can be completed by simply clicking on them (they can be clicked again to uncomplete, like a checklist). Cards which contain an input or search selection will complete when their input list has at least one entry.

# Structure

There are five core stages in a PWP assessment, each with subsections. The structure is as follows:

1. Introduction
2. Information Gathering
    * Problem
    * Symptoms
    * Impacts
    * ROMs
    * Safety
    * Context
    * Goals
3. Information Giving
    * Diagnosis
    * CBT
    * Treatment Options
4. Shared Decision Making
5. Ending
    * Problem Statement
    * Next Steps

I will seperate each card with --- and code Direction, Verbatim, Input, and Search as D, V, I, and S respectively. I have used ${} synatax where a tracked variable should be included in the text, and have included notes on branching content within {}.

## Introduction

D: Give your full name and preferred name.

D: Ask for the patient's full name and preferred name.

I: Patient's preferred name

---

V: Nice to meet you ${name}, how was your journey here?

V: I'll start by telling you a little bit about myself. I’m a trainee Psychological Wellbeing Practitioner (PWP), which means I’m training to help people experiencing common mental health problems like depression and anxiety. As a PWP I work as part of a larger team, including other therapists, your GP, and employment support co-ordinators. I’m telling you this because, depending on the outcome of our assessment, it might not be me that carries on supporting you. Does that all make sense?

V: So the assessment will last 45 minutes, do you have this time available now?

V: Great. So over these next 45 minutes, I’d like you to explain to me some of the problems your facing at the moment. We’ll go through some questionnaires and a safety assessment and then I’ll give you some information about what our service might be able to offer you in terms of treatment. Is that okay?

V: Alright. Another thing: you might hear me typing while we talk. I promise I’m paying attention, I’m just taking notes. These notes, and everything you tell me today will remain largely confidential within the service. The only exception to this is if you say something that indicates that you or someone else is at risk, as in that case I would have to pass this information on. If that happens I will always try to discuss this with you first, but this may not always be possible. Is that clear?

---

## Information Gathering

### Problem

V: So ${name}, could you tell me a little bit about what’s brought you here today?

I: Core problem

S: Category (Anxiety, Mood, Pain, Panic, Stress, Other)

---

D: Explore the three Ws.

V: Is there a specific place or situation where...

I: Where?

V: Is there a specific time of day where...

I: When?

V: Is there a specific person or group of people who make you feel...

I: Who?

---

V: Have you noticed anything specific that triggers this feeling?

I: Triggers

---

### Symptoms

V: To help me get a really clear picture, I'm going to ask some specific questions about three areas, and those are your physical sensations, your behaviours, and your thoughts. So starting with your physical sensations...

I: Sensations

I: Behaviours

I: Thoughts

D: Ask clearly if there are any other sensations, behaviours or thoughts for each category.

D: Explore symptoms by asking about frequency, intensity, duration, and onset (FIDO).

---

D: Summarise symptoms back to the patient.

---

### Impacts

D: Ask about the impact of the patient's symptoms on aspects of their life.

I: Impact at work

I: Impact at home

I: Impact on hobbies

I: Impact on social life

I: Impact on relationships

---

### ROMs

V: Now I'd like to ask you to complete a couple of short questionnaires. They’re just help us get a snapshot of how you've been feeling over the last two weeks and help us track your progress.

D: Pass the patient the ROMS.

V: So this is the PHQ-9, which asks you about symptoms of depression and low mood. This one is the GAD-7, which asks about symptoms of anxiety. As you can see, you are asked how often in the last two weeks you have experienced each symptom - either not at all, several days, more than half the days, or nearly every day. We can go through them together, or you can fill them out on your own, whichever you prefer.

I: PHQ-9 score

I: PHQ-9 Q9 score

I: GAD-7 score

---

{The content of this card varies based on the value of `phqScore` and `gadScore`. The threshold scores for each battery are common knowledge.}

Verbatim for sub clinical scores: Your score on the {phq/gad} indicates that you are experiencing sub-clinical {depressive/anxiety} symptoms. What this means is that your score does not differ significantly from what we’d expect to see in the general population.

Verbatim for mild scores: Your score on the {phq/gad} indicates that you are experiencing mild {depressive/anxiety} symptoms. What this means is that you have felt quite {depressed/anxious} for several days over the past two weeks.

Verbatim for moderate scores: Your score on the {phq/gad} indicates that you are experiencing moderate {depressive/anxiety} symptoms. What this means is that you have felt {depressed/anxious} for more than half the days over the past two weeks.

Verbatim for severe scores: Your score on the {phq/gad} indicates that you are experiencing severe {depressive/anxiety} symptoms. What this means is that you have felt very {depressed/anxious} almost every day over the past two weeks.

D: Check these results reflect the patient's experience.

---

### Safety

V: When we experience mental health difficulties, it’s common to have thoughts about things like suicide and self-harm, so we’re going to complete a safety assessment now which will ask about these and other areas of your safety. We do this at every appointment with every patient, because someone’s safety can change quickly.

D: Ask the following questions. If the patient answers anything other than 'no' for a question, funnel using FIDO and potentially create a safety plan at the end.

V: Are you currently experiencing any thoughts of suicide?

V: Have you made any current plans to end your life?

V: Have you taken any recent actions towards ending your life?

V: Have you ever experienced thoughts of suicide in the past?

V: Have you ever taken any actions towards ending your life in the past?

V: If you were to ever have these thoughts, what things would stop you acting on them?

I: Protective factors

V: Do you have any current thoughts of self-harm?

V: Have you taken any recent actions towards self-harm?

V: Have you ever self-harmed in the past?

V: Do you feel that you currently pose a risk of harm to anyone else?

V: Do you feel at risk of harm from anyone else currently?

V: Do you feel that you are currently neglecting yourself in any way?

V: Is there anyone who depends on you for their care at the moment?

V: Are you experiencing any difficulties meeting the needs of the people in your care?

V: Do you feel that you might be neglecting the needs of anyone else at all?

---

V: If your answers to any of these questions were to change, do you know who you would speak to or where you would go?

D: Give the patient the safety information sheet.

---

D: Confirm the patient's score of ${phq9q9score} on the PHQ-9 Q9 is consistent with their responses.

---

D: Summarise the patient's answers to the safety assessment.

S: Safety plan required? (yes, no)

---

{This card only shows if a safety plan is required.}

I: Early warning signs

I: Coping strategies

I: Support networks

I: Contact points

I: Disposal of means

---

### Context

V: Now I'd like to ask you some broader questions to get some more context.

S: Other mental health conditions (include a comprehensive list of psychiatric diagnoses here, or none)

I: Physical long-term health conditions

---

I: Onset

I: Motivation for seeking help now

---

I: Current treatments

I: Past treatments

---

S: Medication for mental health (include a comprehensive list of psychiatric drugs here, or none)

I: Attituate towards medication

---

V: You might have come here today with some expectations regarding treatment and what we do at NHS TT. Do you have any specific expectations?

I: Expectations

---

D: Ask about substance use, and specifically if it has changed.

I: Caffiene consumption

I: Alcohol consumption

I: Recreational drug use

---

D: Ask explicitly if there is anything else the patient would like to mention.

---

D: Establish clear, specific and measurable patient goals.

I: Patient goals

---

## Information Giving

### Diagnosis

S: Diagnosis (Depression, GAD, Panic Disorder, Agoraphobia, Agoraphobia with Panic Disorder, Phobia, OCD, PTSD, Social Phobia, Hypochondriasis, BDD)

---

{The content of this card varies based on the value of `diagnosis`. See the table below.}

| **Diagnosis** | **Normalising** | **Description** |
| --- | --- | --- |
| **Depression** | Very common. 1 in 20 suffer from depression. | More than just feeling sad. It's a persistent low mood, hopelessness, and a loss of interest or pleasure in nearly all activities, lasting at least two weeks. It often affects sleep, appetite, and energy. |
| **GAD** | Common. Affects **about 3.1% of U.S. adults** each year. It often develops gradually. | Excessive, uncontrollable worry about many different things (money, health, work) that is out of proportion to the situation. It's often paired with physical symptoms like muscle tension, restlessness, and fatigue. |
| **Panic Disorder** | Affects **about 2.7% of U.S. adults** annually. | Involves recurrent, sudden, and intense episodes of fear (panic attacks) that peak within minutes. A key feature is the intense fear *of* having another attack, leading to avoidance. |
| **Agoraphobia** | Affects **about 1.7% of adolescents and adults** annually. | An intense fear of situations where escape might be difficult or help unavailable if panic strikes. This leads to avoiding places like public transport, crowds, open spaces, or enclosed shops. |
| **Specific Phobias** | Very common. Affects **7% to 9% of the population**. | An intense, irrational fear of a specific object or situation (e.g., spiders, heights, needles, flying). The fear is immediate and overwhelming, leading to active avoidance. |
| **OCD** | Millions of people in this country experience OCD at some point in their life. | A cycle of obsessions (unwanted, intrusive thoughts) and compulsions (repetitive behaviours to reduce anxiety) |
| **PTSD** | **1 in 25 adults** have experienced PTSD in the past year. Not everyone who experiences trauma develops it. | Can develop after experiencing or witnessing a traumatic event. Symptoms include flashbacks, nightmares, avoiding reminders of the event, negative feelings, and being easily startled or "on edge." |
| **Social Phobia** | Very common. Affects **an estimated 7% of U.S. adults** in a given year. | An intense, persistent fear of being watched and judged by others in social situations. The person fears they will act in an embarrassing or humiliating way, leading to avoidance of social events. |
| Hypochondriasis | Affects **1.3% to 10% of people** in the general population. | A persistent, excessive worry about having or developing a serious, undiagnosed illness. Normal bodily sensations are often misinterpreted as signs of a severe disease, even after medical reassurance. |
| **BDD** | Affects **about 2.4% of U.S. adults** (roughly as common as OCD). | A preoccupation with one or more perceived flaws in physical appearance that are minor or not observable to others. This causes significant distress and repetitive behaviours (e.g., mirror checking, grooming). |

D: Give the informal diagnosis, including explanation of informality, normalising context like prevalence, some common symptoms of a typical presentation, and a check of the patient’s understanding.

---

### CBT

V: Many of the treatments we offer at NHS TT are based on CBT, which stands for congitive behavioural therapy. Can I ask if you've heard of CBT before?

D: Explain CBT using the patient's symptoms as examples.

{This card should include a link which opens a new tab, with a generated diagram. The diagram should include three circles arranged in a triangular formation, containing the patients physical symptoms, their behavioural symptoms, and their cognitive symptoms. The circles should be labelled Sensations, Behaviours and Thoughts respectively}

D: Check patient understanding.

D: Explain how the CBT cycle can be broken using therapy.

D: Check patient understanding again.

---

### Treatment Options

{A decision should be made by the user regarding which treatment, LiCBT or HiCBT is more suitable given the `diagnosis`. Present the relevant row of this table to the user.}

| **Diagnosis** | LiCBT | HiCBT |
| --- | --- | --- |
| **Depression** | For all cases where PHQ-9 score was below ‘severe’. | For all cases where PHQ-9 score was ‘severe’. |
| **GAD** | For all cases where GAD-7 score was below ‘severe’. | For all cases where GAD-7 score was ‘severe’. |
| **Panic Disorder** | Depends on impact severity. | Depends on impact severity. |
| **Agoraphobia** | Depends on impact severity. | Depends on impact severity. |
| **Phobias** | Always used for this condition. | Only for Trypanophobia and Emetophobia |
| **OCD** | Depends on symptom severity. | Depends on symptom severity. |
| **PTSD** | Never used for this condition. | Always used for this condition. |
| **Social Phobia** | Never used for this condition. | Always used for this condition. |
| **Hypochondriasis** | Never used for this condition. | Always used for this condition. |
| **BDD** | Never used for this condition. | Always used for this condition. |

S: Treatment (LiCBT, HiCBT)

---

{The content of this card varies based on the value of `treatment`.}

V for LiCBT: I think the treatment you would find most helpful is something called guided self-help, which is a form of CBT. It's a great starting point because it's very flexible and puts you in control. We'd use resources we know are effective, like worksheets or sometimes an online programme, that explains the links between your thoughts, feelings, and behaviours. My role would be to act as your guide, checking in with you regularly in brief 35 minutes sessions to offer support, help you overcome any obstacles, and make sense of the new techniques you're learning. Lasts 4-6 sessions. It’s a way to learn powerful skills without the commitment of longer, more formal therapy sessions straight away, and it tends to be very effective for people in your position.

V for HiCBT: I think the treatment you would find most helpful is something called High-Intensity Cognitive Behavioural Therapy, or CBT. Because you've described your symptoms as being particularly severe and having a big impact on your life, this approach would give you more 1-on-1 time and allow you to dive deeper into what's going on. You would meet regularly, usually weekly, with a CBT therapist for 50-minute sessions. Together, you'd be able to explore the root of these difficulties in more detail and develop a very personalised plan to tackle them more deeply, which tends to be very effective for people in your position.

D: Ask how the patient feels about this course of treatment.

---

## Shared Decision Making

V: It's really important to explore issues which might impact your engagement with this treatment, so I'm going to ask you some questions about your capability, opportunities, and motivation regarding ${treatment}. Starting with capability, can you forsee any barriers in this regard? This could be things like concentration, eyesight and reading...

I: Capability considerations

I: Opportunity considerations

I: Motivation considerations

I: Motivation out of ten

---

V: We offer appointments over the phone, video call, or in person. Bear in mind that these are all equally effective, so it really is down to your preference.

D: Explore capability surrounding modality and technology.

---

D: Give the patient a booklet about ${treatment} for ${diagnosis}. Highlight the relevance of specific pages. This could be the explanation of CBT, testemonials, or more information about their diagnosis.

---

D: Agree a plan for treatment, taking into account COM-B and modality preferences, and ensure the patient reflects it back.

V: Just to reiterate because it's really important, engaging with the materials outside of sessions is really important for the effectiveness of the treatment. So If you can find the time to read those pages of the booklet, I reccomend you do.

---

## Ending

V: What I’d like to do now is to draw all the main points we've discussed into one single summary. We call this a 'problem statement', and its very useful because it gives us a baseline or starting point for treatment. We can look back at it later to help us track your progress, see which parts are getting better, and identify if we need to make any adjustments to our plan. Does that make sense?

V: You can write the statement yourself, or I can write it for you. Which would you prefer?

---

{Embed the patient's readonly answers to questions in the problem, symptoms, impacts and goals sections here for quick reference}

I: Problem statement

D: Read it back to the patient and confirm it fits their expereince.

---

D: Reiterate next steps

D: Ask patient to reflect back and record next steps

D: Establish next contact

---

# Technical Notes

The current session and all its data should be stored in broswer storage to avoid loss of progress if the tab is accidentaly closed.

This is a dekstop first web app built using vanilla JS, HTML and CSS. There is no need for mobile support - prioritise design simplicity.