import UpdateBody from "@/app/components/UpdateBody";
import { createClient } from "@/app/utils/supabase/server";
import { Container } from "@chakra-ui/react";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: update } = await supabase
    .from("updates")
    .select()
    .eq("id", params.slug)
    .single();

  return (
    <Container maxW={"3xl"}>
      <UpdateBody open key={update.id} update={update} author={update.author} />
    </Container>
  );
}
