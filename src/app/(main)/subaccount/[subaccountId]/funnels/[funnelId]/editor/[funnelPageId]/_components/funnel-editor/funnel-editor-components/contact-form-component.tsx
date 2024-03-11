"use client";
import ContactForm from "@/components/forms/contact-form";
import { toast } from "@/components/ui/use-toast";
import {
  getFunnel,
  saveActivityLogsNotification,
  upsertContact,
} from "@/lib/queries";

import { ContactUserFormSchema } from "@/lib/types";
import {
  EditorElement as EditorElementTypew,
  useEditor,
} from "@/providers/editor/editor-provider";
import { useRouter } from "next/navigation";

import React from "react";
import { z } from "zod";
import EditorElement from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/editor-element";

type Props = {
  element: EditorElementTypew;
};

const ContactFormComponent = (props: Props) => {
  const { state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();

  const goToNextPage = async () => {
    if (!state.editor.liveMode || state.editor.previewMode) return;
    const funnelPages = await getFunnel(funnelId);
    if (!funnelPages || !pageDetails) return;
    if (funnelPages.FunnelPages.length > pageDetails.order + 1) {
      const nextPage = funnelPages.FunnelPages.find(
        (page) => page.order === pageDetails.order + 1,
      );
      if (!nextPage) return;
      router.replace(
        `${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`,
      );
    }
  };

  const onFormSubmit = async (
    values: z.infer<typeof ContactUserFormSchema>,
  ) => {
    if (!state.editor.liveMode || state.editor.previewMode) return;

    try {
      const response = await upsertContact({
        ...values,
        subAccountId: subaccountId,
      });

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `A New contact signed up | ${response?.name}`,
        subaccountId: subaccountId,
      });
      toast({
        title: "Success",
        description: "Successfully Saved your info",
      });
      await goToNextPage();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Could not save your information",
      });
    }
  };

  return (
    <EditorElement
      element={props.element}
      classValues={[
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
      ]}
    >
      <ContactForm
        subTitle="Contact Us"
        title="Want a free quote? We can help you"
        apiCall={onFormSubmit}
      />
    </EditorElement>
  );
};

export default ContactFormComponent;
