# PWP Assessment Tool - Card Definitions

This file defines all assessment cards in structured format. Implement as JavaScript array in `cards.js`.

## Format Notes

- **D** = Direction (grey box, instruction)
- **V** = Verbatim (blue box, read aloud)
- **I** = Input (text/number field)
- **S** = Search (filterable select)
- `${var}` = variable interpolation
- `showIf` = conditional rendering function

---

## 1. Introduction

### Card: intro-1
```javascript
{
  id: "intro-1",
  section: "introduction",
  items: [
    {type: "direction", content: "Give your full name and preferred name."},
    {type: "direction", content: "Ask for the patient's full name and preferred name."},
    {type: "input", inputType: "text", label: "Patient's preferred name", stateKey: "patient-name"}
  ]
}
```

### Card: intro-2
```javascript
{
  id: "intro-2",
  section: "introduction",
  items: [
    {type: "verbatim", content: "Nice to meet you ${name}, how was your journey here?"},
    {type: "verbatim", content: "I'll start by telling you a little bit about myself. I'm a trainee Psychological Wellbeing Practitioner (PWP), which means I'm training to help people experiencing common mental health problems like depression and anxiety. As a PWP I work as part of a larger team, including other therapists, your GP, and employment support co-ordinators. I'm telling you this because, depending on the outcome of our assessment, it might not be me that carries on supporting you. Does that all make sense?"},
    {type: "verbatim", content: "So the assessment will last 45 minutes, do you have this time available now?"},
    {type: "verbatim", content: "Great. So over these next 45 minutes, I'd like you to explain to me some of the problems your facing at the moment. We'll go through some questionnaires and a safety assessment and then I'll give you some information about what our service might be able to offer you in terms of treatment. Is that okay?"},
    {type: "verbatim", content: "Alright. Another thing: you might hear me typing while we talk. I promise I'm paying attention, I'm just taking notes. These notes, and everything you tell me today will remain largely confidential within the service. The only exception to this is if you say something that indicates that you or someone else is at risk, as in that case I would have to pass this information on. If that happens I will always try to discuss this with you first, but this may not always be possible. Is that clear?"}
  ]
}
```

---

## 2. Information Gathering - Problem

### Card: problem-1
```javascript
{
  id: "problem-1",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "So ${name}, could you tell me a little bit about what's brought you here today?"},
    {type: "input", inputType: "text", label: "Core problem", stateKey: "core-problem"},
    {type: "search", label: "Category", stateKey: "category",
     options: ["Anxiety", "Mood", "Pain", "Panic", "Stress", "Other"]}
  ]
}
```

### Card: problem-2
```javascript
{
  id: "problem-2",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Explore the three Ws."},
    {type: "verbatim", content: "Is there a specific place or situation where..."},
    {type: "input", inputType: "text", label: "Where?", stateKey: "where"},
    {type: "verbatim", content: "Is there a specific time of day where..."},
    {type: "input", inputType: "text", label: "When?", stateKey: "when"},
    {type: "verbatim", content: "Is there a specific person or group of people who make you feel..."},
    {type: "input", inputType: "text", label: "Who?", stateKey: "who"}
  ]
}
```

### Card: problem-3
```javascript
{
  id: "problem-3",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "Have you noticed anything specific that triggers this feeling?"},
    {type: "input", inputType: "text", label: "Triggers", stateKey: "triggers"}
  ]
}
```

---

## 2. Information Gathering - Symptoms

### Card: symptoms-1
```javascript
{
  id: "symptoms-1",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "To help me get a really clear picture, I'm going to ask some specific questions about three areas, and those are your physical sensations, your behaviours, and your thoughts. So starting with your physical sensations..."},
    {type: "input", inputType: "text", label: "Sensations", stateKey: "sensations"},
    {type: "input", inputType: "text", label: "Behaviours", stateKey: "behaviours"},
    {type: "input", inputType: "text", label: "Thoughts", stateKey: "thoughts"},
    {type: "direction", content: "Ask clearly if there are any other sensations, behaviours or thoughts for each category."},
    {type: "direction", content: "Explore symptoms by asking about frequency, intensity, duration, and onset (FIDO)."}
  ]
}
```

### Card: symptoms-2
```javascript
{
  id: "symptoms-2",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Summarise symptoms back to the patient."}
  ]
}
```

---

## 2. Information Gathering - Impacts

### Card: impacts-1
```javascript
{
  id: "impacts-1",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Ask about the impact of the patient's symptoms on aspects of their life."},
    {type: "input", inputType: "text", label: "Impact at work", stateKey: "impact-work"},
    {type: "input", inputType: "text", label: "Impact at home", stateKey: "impact-home"},
    {type: "input", inputType: "text", label: "Impact on hobbies", stateKey: "impact-hobbies"},
    {type: "input", inputType: "text", label: "Impact on social life", stateKey: "impact-social"},
    {type: "input", inputType: "text", label: "Impact on relationships", stateKey: "impact-relationships"}
  ]
}
```

---

## 2. Information Gathering - ROMs

### Card: roms-1
```javascript
{
  id: "roms-1",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "Now I'd like to ask you to complete a couple of short questionnaires. They're just help us get a snapshot of how you've been feeling over the last two weeks and help us track your progress."},
    {type: "direction", content: "Pass the patient the ROMS."},
    {type: "verbatim", content: "So this is the PHQ-9, which asks you about symptoms of depression and low mood. This one is the GAD-7, which asks about symptoms of anxiety. As you can see, you are asked how often in the last two weeks you have experienced each symptom - either not at all, several days, more than half the days, or nearly every day. We can go through them together, or you can fill them out on your own, whichever you prefer."},
    {type: "input", inputType: "number", label: "PHQ-9 score", stateKey: "phq9-score"},
    {type: "input", inputType: "number", label: "PHQ-9 Q9 score", stateKey: "phq9-q9"},
    {type: "input", inputType: "number", label: "GAD-7 score", stateKey: "gad7-score"}
  ]
}
```

### Card: roms-feedback (conditional)
```javascript
{
  id: "roms-feedback",
  section: "information-gathering",
  showIf: (state) => state.inputs["phq9-score"]?.[0] >= 0 || state.inputs["gad7-score"]?.[0] >= 0,
  items: [
    {
      type: "verbatim",
      content: (state) => {
        let feedback = "";
        const phq = state.inputs["phq9-score"]?.[0];
        const gad = state.inputs["gad7-score"]?.[0];

        if (phq >= 0) {
          if (phq < 5) feedback += "Your score on the PHQ-9 indicates that you are experiencing sub-clinical depressive symptoms. What this means is that your score does not differ significantly from what we'd expect to see in the general population.\n\n";
          else if (phq < 10) feedback += "Your score on the PHQ-9 indicates that you are experiencing mild depressive symptoms. What this means is that you have felt quite depressed for several days over the past two weeks.\n\n";
          else if (phq < 15) feedback += "Your score on the PHQ-9 indicates that you are experiencing moderate depressive symptoms. What this means is that you have felt depressed for more than half the days over the past two weeks.\n\n";
          else feedback += "Your score on the PHQ-9 indicates that you are experiencing severe depressive symptoms. What this means is that you have felt very depressed almost every day over the past two weeks.\n\n";
        }

        if (gad >= 0) {
          if (gad < 5) feedback += "Your score on the GAD-7 indicates that you are experiencing sub-clinical anxiety symptoms. What this means is that your score does not differ significantly from what we'd expect to see in the general population.";
          else if (gad < 10) feedback += "Your score on the GAD-7 indicates that you are experiencing mild anxiety symptoms. What this means is that you have felt quite anxious for several days over the past two weeks.";
          else if (gad < 15) feedback += "Your score on the GAD-7 indicates that you are experiencing moderate anxiety symptoms. What this means is that you have felt anxious for more than half the days over the past two weeks.";
          else feedback += "Your score on the GAD-7 indicates that you are experiencing severe anxiety symptoms. What this means is that you have felt very anxious almost every day over the past two weeks.";
        }

        return feedback;
      }
    },
    {type: "direction", content: "Check these results reflect the patient's experience."}
  ]
}
```

---

## 2. Information Gathering - Safety

### Card: safety-1
```javascript
{
  id: "safety-1",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "When we experience mental health difficulties, it's common to have thoughts about things like suicide and self-harm, so we're going to complete a safety assessment now which will ask about these and other areas of your safety. We do this at every appointment with every patient, because someone's safety can change quickly."},
    {type: "direction", content: "Ask the following questions. If the patient answers anything other than 'no' for a question, funnel using FIDO and potentially create a safety plan at the end."},
    {type: "verbatim", content: "Are you currently experiencing any thoughts of suicide?"},
    {type: "verbatim", content: "Have you made any current plans to end your life?"},
    {type: "verbatim", content: "Have you taken any recent actions towards ending your life?"},
    {type: "verbatim", content: "Have you ever experienced thoughts of suicide in the past?"},
    {type: "verbatim", content: "Have you ever taken any actions towards ending your life in the past?"},
    {type: "verbatim", content: "If you were to ever have these thoughts, what things would stop you acting on them?"},
    {type: "input", inputType: "text", label: "Protective factors", stateKey: "protective-factors"},
    {type: "verbatim", content: "Do you have any current thoughts of self-harm?"},
    {type: "verbatim", content: "Have you taken any recent actions towards self-harm?"},
    {type: "verbatim", content: "Have you ever self-harmed in the past?"},
    {type: "verbatim", content: "Do you feel that you currently pose a risk of harm to anyone else?"},
    {type: "verbatim", content: "Do you feel at risk of harm from anyone else currently?"},
    {type: "verbatim", content: "Do you feel that you are currently neglecting yourself in any way?"},
    {type: "verbatim", content: "Is there anyone who depends on you for their care at the moment?"},
    {type: "verbatim", content: "Are you experiencing any difficulties meeting the needs of the people in your care?"},
    {type: "verbatim", content: "Do you feel that you might be neglecting the needs of anyone else at all?"}
  ]
}
```

### Card: safety-2
```javascript
{
  id: "safety-2",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "If your answers to any of these questions were to change, do you know who you would speak to or where you would go?"},
    {type: "direction", content: "Give the patient the safety information sheet."}
  ]
}
```

### Card: safety-3
```javascript
{
  id: "safety-3",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Confirm the patient's score of ${phq9q9score} on the PHQ-9 Q9 is consistent with their responses."}
  ]
}
```

### Card: safety-4
```javascript
{
  id: "safety-4",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Summarise the patient's answers to the safety assessment."},
    {type: "search", label: "Safety plan required?", stateKey: "safety-plan-required",
     options: ["yes", "no"]}
  ]
}
```

### Card: safety-plan (conditional)
```javascript
{
  id: "safety-plan",
  section: "information-gathering",
  showIf: (state) => state.inputs["safety-plan-required"]?.[0] === "yes",
  items: [
    {type: "input", inputType: "text", label: "Early warning signs", stateKey: "warning-signs"},
    {type: "input", inputType: "text", label: "Coping strategies", stateKey: "coping-strategies"},
    {type: "input", inputType: "text", label: "Support networks", stateKey: "support-networks"},
    {type: "input", inputType: "text", label: "Contact points", stateKey: "contact-points"},
    {type: "input", inputType: "text", label: "Disposal of means", stateKey: "disposal-means"}
  ]
}
```

---

## 2. Information Gathering - Context

### Card: context-1
```javascript
{
  id: "context-1",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "Now I'd like to ask you some broader questions to get some more context."},
    {type: "search", label: "Other mental health conditions", stateKey: "other-mh-conditions",
     options: ["None", "Depression", "Generalised Anxiety Disorder", "Panic Disorder", "Agoraphobia",
               "Social Phobia", "Specific Phobia", "OCD", "PTSD", "Bipolar Disorder", "Schizophrenia",
               "Personality Disorder", "Eating Disorder", "ADHD", "Autism", "Other"]},
    {type: "input", inputType: "text", label: "Physical long-term health conditions", stateKey: "physical-conditions"}
  ]
}
```

### Card: context-2
```javascript
{
  id: "context-2",
  section: "information-gathering",
  items: [
    {type: "input", inputType: "text", label: "Onset", stateKey: "onset"},
    {type: "input", inputType: "text", label: "Motivation for seeking help now", stateKey: "motivation-now"}
  ]
}
```

### Card: context-3
```javascript
{
  id: "context-3",
  section: "information-gathering",
  items: [
    {type: "input", inputType: "text", label: "Current treatments", stateKey: "current-treatments"},
    {type: "input", inputType: "text", label: "Past treatments", stateKey: "past-treatments"}
  ]
}
```

### Card: context-4
```javascript
{
  id: "context-4",
  section: "information-gathering",
  items: [
    {type: "search", label: "Medication for mental health", stateKey: "mh-medication",
     options: ["None", "Sertraline", "Citalopram", "Fluoxetine", "Escitalopram", "Paroxetine",
               "Venlafaxine", "Duloxetine", "Mirtazapine", "Amitriptyline", "Propranolol",
               "Diazepam", "Lorazepam", "Quetiapine", "Olanzapine", "Other"]},
    {type: "input", inputType: "text", label: "Attitude towards medication", stateKey: "medication-attitude"}
  ]
}
```

### Card: context-5
```javascript
{
  id: "context-5",
  section: "information-gathering",
  items: [
    {type: "verbatim", content: "You might have come here today with some expectations regarding treatment and what we do at NHS TT. Do you have any specific expectations?"},
    {type: "input", inputType: "text", label: "Expectations", stateKey: "expectations"}
  ]
}
```

### Card: context-6
```javascript
{
  id: "context-6",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Ask about substance use, and specifically if it has changed."},
    {type: "input", inputType: "text", label: "Caffeine consumption", stateKey: "caffeine"},
    {type: "input", inputType: "text", label: "Alcohol consumption", stateKey: "alcohol"},
    {type: "input", inputType: "text", label: "Recreational drug use", stateKey: "drugs"}
  ]
}
```

### Card: context-7
```javascript
{
  id: "context-7",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Ask explicitly if there is anything else the patient would like to mention."}
  ]
}
```

### Card: goals
```javascript
{
  id: "goals",
  section: "information-gathering",
  items: [
    {type: "direction", content: "Establish clear, specific and measurable patient goals."},
    {type: "input", inputType: "text", label: "Patient goals", stateKey: "goals"}
  ]
}
```

---

## 3. Information Giving - Diagnosis

### Card: diagnosis-1
```javascript
{
  id: "diagnosis-1",
  section: "information-giving",
  items: [
    {type: "search", label: "Diagnosis", stateKey: "diagnosis",
     options: ["Depression", "GAD", "Panic Disorder", "Agoraphobia",
               "Agoraphobia with Panic Disorder", "Phobia", "OCD", "PTSD",
               "Social Phobia", "Hypochondriasis", "BDD"]}
  ]
}
```

### Card: diagnosis-info (conditional)
```javascript
{
  id: "diagnosis-info",
  section: "information-giving",
  showIf: (state) => state.inputs["diagnosis"]?.[0],
  items: [
    {
      type: "direction",
      content: (state) => {
        const dx = state.inputs["diagnosis"]?.[0];
        const info = {
          "Depression": {
            norm: "Very common. 1 in 20 suffer from depression.",
            desc: "More than just feeling sad. It's a persistent low mood, hopelessness, and a loss of interest or pleasure in nearly all activities, lasting at least two weeks. It often affects sleep, appetite, and energy."
          },
          "GAD": {
            norm: "Common. Affects about 3.1% of U.S. adults each year. It often develops gradually.",
            desc: "Excessive, uncontrollable worry about many different things (money, health, work) that is out of proportion to the situation. It's often paired with physical symptoms like muscle tension, restlessness, and fatigue."
          },
          "Panic Disorder": {
            norm: "Affects about 2.7% of U.S. adults annually.",
            desc: "Involves recurrent, sudden, and intense episodes of fear (panic attacks) that peak within minutes. A key feature is the intense fear of having another attack, leading to avoidance."
          },
          "Agoraphobia": {
            norm: "Affects about 1.7% of adolescents and adults annually.",
            desc: "An intense fear of situations where escape might be difficult or help unavailable if panic strikes. This leads to avoiding places like public transport, crowds, open spaces, or enclosed shops."
          },
          "Phobia": {
            norm: "Very common. Affects 7% to 9% of the population.",
            desc: "An intense, irrational fear of a specific object or situation (e.g., spiders, heights, needles, flying). The fear is immediate and overwhelming, leading to active avoidance."
          },
          "OCD": {
            norm: "Millions of people in this country experience OCD at some point in their life.",
            desc: "A cycle of obsessions (unwanted, intrusive thoughts) and compulsions (repetitive behaviours to reduce anxiety)"
          },
          "PTSD": {
            norm: "1 in 25 adults have experienced PTSD in the past year. Not everyone who experiences trauma develops it.",
            desc: "Can develop after experiencing or witnessing a traumatic event. Symptoms include flashbacks, nightmares, avoiding reminders of the event, negative feelings, and being easily startled or 'on edge.'"
          },
          "Social Phobia": {
            norm: "Very common. Affects an estimated 7% of U.S. adults in a given year.",
            desc: "An intense, persistent fear of being watched and judged by others in social situations. The person fears they will act in an embarrassing or humiliating way, leading to avoidance of social events."
          },
          "Hypochondriasis": {
            norm: "Affects 1.3% to 10% of people in the general population.",
            desc: "A persistent, excessive worry about having or developing a serious, undiagnosed illness. Normal bodily sensations are often misinterpreted as signs of a severe disease, even after medical reassurance."
          },
          "BDD": {
            norm: "Affects about 2.4% of U.S. adults (roughly as common as OCD).",
            desc: "A preoccupation with one or more perceived flaws in physical appearance that are minor or not observable to others. This causes significant distress and repetitive behaviours (e.g., mirror checking, grooming)."
          }
        };

        const data = info[dx] || {norm: "", desc: ""};
        return `Give the informal diagnosis. ${data.norm} ${data.desc} Check patient understanding.`;
      }
    }
  ]
}
```

---

## 3. Information Giving - CBT

### Card: cbt-1
```javascript
{
  id: "cbt-1",
  section: "information-giving",
  items: [
    {type: "verbatim", content: "Many of the treatments we offer at NHS TT are based on CBT, which stands for cognitive behavioural therapy. Can I ask if you've heard of CBT before?"},
    {type: "direction", content: "Explain CBT using the patient's symptoms as examples."},
    {type: "direction", content: "Show CBT cycle diagram with patient's Sensations, Behaviours, and Thoughts in three interconnected circles."},
    {type: "direction", content: "Check patient understanding."},
    {type: "direction", content: "Explain how the CBT cycle can be broken using therapy."},
    {type: "direction", content: "Check patient understanding again."}
  ]
}
```

---

## 3. Information Giving - Treatment

### Card: treatment-decision
```javascript
{
  id: "treatment-decision",
  section: "information-giving",
  items: [
    {
      type: "direction",
      content: (state) => {
        const dx = state.inputs["diagnosis"]?.[0];
        const phq = state.inputs["phq9-score"]?.[0];
        const gad = state.inputs["gad7-score"]?.[0];

        const guidance = {
          "Depression": phq >= 15 ? "HiCBT for severe PHQ-9" : "LiCBT for below severe",
          "GAD": gad >= 15 ? "HiCBT for severe GAD-7" : "LiCBT for below severe",
          "Panic Disorder": "Depends on impact severity",
          "Agoraphobia": "Depends on impact severity",
          "Phobia": "LiCBT (except Trypanophobia/Emetophobia use HiCBT)",
          "OCD": "Depends on symptom severity",
          "PTSD": "Always HiCBT",
          "Social Phobia": "Always HiCBT",
          "Hypochondriasis": "Always HiCBT",
          "BDD": "Always HiCBT"
        };

        return `Treatment decision guidance: ${guidance[dx] || "Consider impact severity"}`;
      }
    },
    {type: "search", label: "Treatment", stateKey: "treatment", options: ["LiCBT", "HiCBT"]}
  ]
}
```

### Card: treatment-info (conditional)
```javascript
{
  id: "treatment-info",
  section: "information-giving",
  showIf: (state) => state.inputs["treatment"]?.[0],
  items: [
    {
      type: "verbatim",
      content: (state) => {
        const tx = state.inputs["treatment"]?.[0];
        if (tx === "LiCBT") {
          return "I think the treatment you would find most helpful is something called guided self-help, which is a form of CBT. It's a great starting point because it's very flexible and puts you in control. We'd use resources we know are effective, like worksheets or sometimes an online programme, that explains the links between your thoughts, feelings, and behaviours. My role would be to act as your guide, checking in with you regularly in brief 35 minute sessions to offer support, help you overcome any obstacles, and make sense of the new techniques you're learning. Lasts 4-6 sessions. It's a way to learn powerful skills without the commitment of longer, more formal therapy sessions straight away, and it tends to be very effective for people in your position.";
        } else {
          return "I think the treatment you would find most helpful is something called High-Intensity Cognitive Behavioural Therapy, or CBT. Because you've described your symptoms as being particularly severe and having a big impact on your life, this approach would give you more 1-on-1 time and allow you to dive deeper into what's going on. You would meet regularly, usually weekly, with a CBT therapist for 50-minute sessions. Together, you'd be able to explore the root of these difficulties in more detail and develop a very personalised plan to tackle them more deeply, which tends to be very effective for people in your position.";
        }
      }
    },
    {type: "direction", content: "Ask how the patient feels about this course of treatment."}
  ]
}
```

---

## 4. Shared Decision Making

### Card: sdm-1
```javascript
{
  id: "sdm-1",
  section: "shared-decision-making",
  items: [
    {type: "verbatim", content: "It's really important to explore issues which might impact your engagement with this treatment, so I'm going to ask you some questions about your capability, opportunities, and motivation regarding ${treatment}. Starting with capability, can you foresee any barriers in this regard? This could be things like concentration, eyesight and reading..."},
    {type: "input", inputType: "text", label: "Capability considerations", stateKey: "capability"},
    {type: "input", inputType: "text", label: "Opportunity considerations", stateKey: "opportunity"},
    {type: "input", inputType: "text", label: "Motivation considerations", stateKey: "motivation-considerations"},
    {type: "input", inputType: "number", label: "Motivation out of ten", stateKey: "motivation-score"}
  ]
}
```

### Card: sdm-2
```javascript
{
  id: "sdm-2",
  section: "shared-decision-making",
  items: [
    {type: "verbatim", content: "We offer appointments over the phone, video call, or in person. Bear in mind that these are all equally effective, so it really is down to your preference."},
    {type: "direction", content: "Explore capability surrounding modality and technology."}
  ]
}
```

### Card: sdm-3
```javascript
{
  id: "sdm-3",
  section: "shared-decision-making",
  items: [
    {type: "direction", content: "Give the patient a booklet about ${treatment} for ${diagnosis}. Highlight the relevance of specific pages. This could be the explanation of CBT, testimonials, or more information about their diagnosis."}
  ]
}
```

### Card: sdm-4
```javascript
{
  id: "sdm-4",
  section: "shared-decision-making",
  items: [
    {type: "direction", content: "Agree a plan for treatment, taking into account COM-B and modality preferences, and ensure the patient reflects it back."},
    {type: "verbatim", content: "Just to reiterate because it's really important, engaging with the materials outside of sessions is really important for the effectiveness of the treatment. So if you can find the time to read those pages of the booklet, I recommend you do."}
  ]
}
```

---

## 5. Ending

### Card: ending-1
```javascript
{
  id: "ending-1",
  section: "ending",
  items: [
    {type: "verbatim", content: "What I'd like to do now is to draw all the main points we've discussed into one single summary. We call this a 'problem statement', and its very useful because it gives us a baseline or starting point for treatment. We can look back at it later to help us track your progress, see which parts are getting better, and identify if we need to make any adjustments to our plan. Does that make sense?"},
    {type: "verbatim", content: "You can write the statement yourself, or I can write it for you. Which would you prefer?"}
  ]
}
```

### Card: ending-2
```javascript
{
  id: "ending-2",
  section: "ending",
  items: [
    {
      type: "direction",
      content: "Summary for reference - Problem: ${core-problem}, Symptoms: ${sensations}, ${behaviours}, ${thoughts}, Impacts: ${impact-work}, ${impact-home}, Goals: ${goals}"
    },
    {type: "input", inputType: "text", label: "Problem statement", stateKey: "problem-statement"},
    {type: "direction", content: "Read it back to the patient and confirm it fits their experience."}
  ]
}
```

### Card: ending-3
```javascript
{
  id: "ending-3",
  section: "ending",
  items: [
    {type: "direction", content: "Reiterate next steps"},
    {type: "direction", content: "Ask patient to reflect back and record next steps"},
    {type: "direction", content: "Establish next contact"}
  ]
}
```

---

## Section Structure

Implement sections array:
```javascript
const sections = [
  {id: "introduction", name: "Introduction"},
  {id: "information-gathering", name: "Information Gathering"},
  {id: "information-giving", name: "Information Giving"},
  {id: "shared-decision-making", name: "Shared Decision Making"},
  {id: "ending", name: "Ending"}
];
```

---

## Implementation Notes

1. All cards above should be in single `cards` array in `cards.js`
2. Filter cards by `showIf` function before rendering
3. Group cards by `section` property for display
4. Use `getVariable()` function for interpolation
5. For dynamic content functions, call with `state` parameter
6. Render section headers before each section's cards
