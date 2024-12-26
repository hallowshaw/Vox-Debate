import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ManualAccordion() {
  return (
    <div className="max-w-3xl ml-8 mt-8">
      {" "}
      {/* Left-aligned with some margin */}
      <Accordion type="single" collapsible className="space-y-4">
        {/* How does Vox Debate work? */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">
            How does Vox Debate work?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Vox Debate uses cutting-edge AI and sentiment analysis to engage
              users in debates. Simply choose a topic, start debating, and the
              AI will respond with logical arguments based on the chosen
              subject.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* What is sentiment analysis? */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">
            What is sentiment analysis in debates?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Sentiment analysis helps the AI understand the emotional tone of
              your statements. It evaluates whether your argument is positive,
              negative, or neutral and tailors responses accordingly.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Choosing debate topics */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">
            Can I choose debate topics?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Yes, you can choose from a variety of predefined topics or suggest
              your own topic. The AI will adapt to the subject and engage in a
              meaningful debate.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Adjusting AI's tone */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold">
            How do I adjust the AI's response tone?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              You can adjust the AI's tone from the "Settings" section. Options
              include formal, casual, persuasive, and neutral tones to suit your
              preference.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Saving and reviewing debates */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold">
            Can I save and review previous debates?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Yes, all your debates are automatically saved in the "History"
              section. You can review them anytime and analyze the arguments
              presented.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Providing feedback */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg font-semibold">
            How do I provide feedback on AI responses?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              You can provide feedback after each debate by rating the AI's
              responses. Your feedback helps improve the AI's performance over
              time.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Reporting issues */}
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-lg font-semibold">
            What should I do if the AI gives irrelevant responses?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              If you encounter irrelevant responses, try rephrasing your
              argument or question. If the issue persists, report it using the
              "Feedback" option in the app.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Data security */}
        <AccordionItem value="item-8">
          <AccordionTrigger className="text-lg font-semibold">
            Is my debate data secure?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Yes, your data is securely stored and encrypted. We prioritize
              user privacy and do not share your information with third parties.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Customizing debates */}
        <AccordionItem value="item-9">
          <AccordionTrigger className="text-lg font-semibold">
            Can I customize debate parameters?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              Absolutely! You can set parameters like debate duration, number of
              arguments, and tone of discussion in the "Customize Debate"
              section.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Troubleshooting */}
        <AccordionItem value="item-10">
          <AccordionTrigger className="text-lg font-semibold">
            What should I do if the app isn't working properly?
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>
              If you experience issues, try refreshing the app or checking your
              internet connection. For further assistance, contact support
              through the "Help" section.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ManualAccordion;
