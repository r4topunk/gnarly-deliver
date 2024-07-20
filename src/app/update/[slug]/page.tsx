import UpdateBody from "@/components/UpdateBody";
import { fetchUpdateById } from "@/lib/supabase";
import { Container, Text } from "@chakra-ui/react";

export default async function Page({ params }: { params: { slug: string } }) {
  const update = await fetchUpdateById(params.slug);

  return (
    <Container maxW={"3xl"}>
      {update ? (
        <UpdateBody
          open
          key={update.id}
          update={update}
          author={update.author}
        />
      ) : (
      <Text>404 - Update not found</Text>
    )}
    </Container>
  );
}
