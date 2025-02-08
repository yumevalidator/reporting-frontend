import Image from "next/image";
import { CircleCheck, CircleAlert, Info, CircleX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { CodeBlock } from "@/components/ui/code-block";

export default function Home() {
  const code = `const DummyComponent = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Fights Counter</h2>
      <p className="mb-2">Fight Club Fights Count: {count}</p>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};
`;
  return (
    <div>
      <div className="flex flex-col ml-4 mt-4 gap-y-4">
        <h1 className="text-xl font-bold">Validation Results</h1>
        <span className="text-[#475569]">
          Here is a comparison between your Figma design and code implementation
        </span>
      </div>
      <div className="mt-8 ml-4">
        <Tabs defaultValue="UI" className="w-auto">
          <TabsList className="grid grid-cols-2 w-96">
            <TabsTrigger value="UI">User Interface</TabsTrigger>
            <TabsTrigger value="Behaviour">
              Behaviour & Interactions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="UI" className="mt-8">
            <div className="grid grid-cols-2 gap-x-20">
              <div>
                <div className="flex items-center justify-center rounded-full h-10 w-40 shadow-lg font-bold">
                  Figma Design
                </div>
                <div className="bg-[#f8fafc] rounded-lg mt-4 flex items-center justify-center">
                  <Image
                    src="https://media.licdn.com/dms/image/v2/D4D12AQHA4SPDhRLMoA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696403345515?e=2147483647&v=beta&t=iFMy2BTouIMesYEzfTerN5wqMN_1DrNV3pKGTQKbP40"
                    alt="Image"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center rounded-full h-10 w-52 shadow-lg font-bold mt-6">
                  Code Implementation
                </div>
                <div className="bg-[#f8fafc] rounded-lg mt-4 flex items-center justify-center">
                  <Image
                    src="https://media.licdn.com/dms/image/v2/D4D12AQHA4SPDhRLMoA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696403345515?e=2147483647&v=beta&t=iFMy2BTouIMesYEzfTerN5wqMN_1DrNV3pKGTQKbP40"
                    alt="Image"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="mr-4">
                <Tabs defaultValue="working">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="working">
                      What&apos;s working
                    </TabsTrigger>
                    <TabsTrigger value="improve">What went wrong</TabsTrigger>
                    <TabsTrigger value="reco">Recommendations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="working">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-x-3">
                          <CircleCheck className="text-green-500" />
                          <div className="flex flex-col">
                            <CardTitle>Use of colors are correct</CardTitle>
                            <CardDescription>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </TabsContent>
                  <TabsContent value="improve">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-x-3">
                          <CircleAlert className="text-orange-500" />
                          <div className="flex flex-col">
                            <CardTitle>Incorrect Font Size</CardTitle>
                            <CardDescription>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="ml-8 -mt-4">
                        <Button variant="outline">Highlight Section</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="reco">
                    <Card>
                      <CardHeader>
                        <div className="grid grid-cols-3 items-center">
                          <div className="col-span-2">
                            <CardTitle>Commit all recommendations</CardTitle>
                            <CardDescription className="mt-2">
                              We will commit all of the recommendations give to
                              your code implementation.
                            </CardDescription>
                          </div>
                          <div className="justify-self-end">
                            <Button variant="default">Commit</Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                    <Card className="mt-4">
                      <CardHeader>
                        <div className="flex items-center gap-x-3">
                          <Info className="text-blue-500" />
                          <div className="flex flex-col">
                            <CardTitle>Ammend font size</CardTitle>
                            <CardDescription>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="ml-8 -mt-4">
                        <Button variant="outline">Commit Recommendation</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Behaviour">
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="responsive">
                <AccordionTrigger>
                  Responsiveness & Adaptability
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-x-3">
                        <CircleCheck className="text-green-500" />
                        <div className="flex flex-col gap-y-1">
                          <CardTitle>Validate mobile responsiveness</CardTitle>
                          <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="interaction">
                <AccordionTrigger>
                  Interactive states & transitions
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-x-3">
                        <CircleCheck className="text-green-500" />
                        <div className="flex flex-col gap-y-1">
                          <CardTitle>
                            Verify button hover & active states
                          </CardTitle>
                          <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="error">
                <AccordionTrigger>Error handling & feedback</AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <div className="grid grid-cols-3 items-center">
                        <div className="col-span-2">
                          <div className="flex items-center gap-x-3">
                            <CircleX className="text-red-600" />
                            <div className="flex flex-col gap-y-1">
                              <CardTitle>
                                Validate form validation messages
                              </CardTitle>
                              <CardDescription>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                        <div className="justify-self-end">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline">View issue</Button>
                            </SheetTrigger>
                            <SheetContent
                              style={{ maxWidth: "40%" }}
                              className="flex flex-col"
                            >
                              <div className="flex-1 overflow-y-auto">
                                <SheetTitle>Validation error</SheetTitle>
                                <SheetDescription>
                                  View your issue here, we have also provided
                                  you with some suggestions to correct them. The
                                  suggested code block will be implemented into
                                  your code implementation if you choose to
                                  commit recommendations.
                                </SheetDescription>
                                <Tabs defaultValue="issue" className="mt-4">
                                  <TabsList className="grid grid-cols-2 w-96">
                                    <TabsTrigger value="issue">
                                      Current issue
                                    </TabsTrigger>
                                    <TabsTrigger value="suggestion">
                                      Suggested correction
                                    </TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="issue">
                                    <div className="mt-5">
                                      <div>
                                        <CardTitle>Problems</CardTitle>
                                        <div className="flex items-center">
                                          <CircleX className="text-red-500 mr-4" />
                                          <CardDescription className="mt-2">
                                            There are no form validation
                                            functions present within the code
                                            implementation.
                                          </CardDescription>
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        <CardTitle className="mb-4">
                                          Code block
                                        </CardTitle>
                                        <CodeBlock
                                          language="jsx"
                                          filename="DummyComponent.jsx"
                                          code={code}
                                        />
                                      </div>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="suggestion">
                                    <div className="mt-5">
                                      <div>
                                        <CardTitle>Problems</CardTitle>
                                        <div className="flex items-center">
                                          <Info className="text-blue-500 mr-4" />
                                          <CardDescription className="mt-2">
                                            Implement form validation functions
                                            to validate error states and guide
                                            users to perform appropriate
                                            actions.
                                          </CardDescription>
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        <CardTitle className="mb-4">
                                          Code block
                                        </CardTitle>
                                        <CodeBlock
                                          language="jsx"
                                          filename="DummyComponent.jsx"
                                          code={code}
                                        />
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                              <SheetFooter className="bg-white border-t-2">
                                <div className="flex justify-end gap-x-4 mt-4">
                                  <Button variant="outline">Cancel</Button>
                                  <Button variant="default">
                                    Commit recommedations
                                  </Button>
                                </div>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="behaviour">
                <AccordionTrigger>Functional behaviour</AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-x-3">
                        <CircleCheck className="text-green-500" />
                        <div className="flex flex-col gap-y-1">
                          <CardTitle>
                            Ensure navigation works correctly
                          </CardTitle>
                          <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
