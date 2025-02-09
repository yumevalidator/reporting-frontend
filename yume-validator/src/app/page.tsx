"use client";

import { useEffect, useState } from "react";
import {
  CircleCheck,
  Info,
  CircleX,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

export default function Home() {
  interface VisualTestResult {
    page_title: string;
    page_id: string;
    working: {
      title: string;
      description: string;
    }[];
    wrong: {
      title: string;
      description: string;
      destination_link: string;
    }[];
    recommendations: {
      title: string;
      description: string;
    }[];
  }

  interface FunctionalTestResult {
    page_title: string;
    description: string;
    succeeded: boolean;
    // Add other properties if needed
  }

  const [visual_test_results, setVisualTestResult] = useState<
    VisualTestResult[]
  >([]);
  const [functional_test_results, setFunctionalTestResult] = useState<
    FunctionalTestResult[]
  >([]);
  const [current_design_selection_index, set_current_design_selection_index] =
    useState(0);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let currentProgress = 0;
    const increment = 75 / 60; // Smooth transition over ~3 seconds (60 steps)

    const interval = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 75)); // Stop at 75
      if (currentProgress >= 75) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Your code here
    fetch("http://localhost:9001/functional_testing_results.json")
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setFunctionalTestResult(data);
        });
      })
      .catch((error) =>
        console.error("Error fetching functional test results:", error),
      );
  }, []);

  useEffect(() => {
    // Your code here
    fetch("http://localhost:9001/visual_testing_results.json")
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setVisualTestResult(data);
        });
      })
      .catch((error) =>
        console.error("Error fetching visual test results:", error),
      );
  });

  const reduce_design_selection_index = () => {
    if (current_design_selection_index > 0) {
      set_current_design_selection_index(current_design_selection_index - 1);
    } else {
      set_current_design_selection_index(visual_test_results.length - 1);
    }
  };

  const increase_design_selection_index = () => {
    if (current_design_selection_index < visual_test_results.length - 1) {
      set_current_design_selection_index(current_design_selection_index + 1);
    } else {
      set_current_design_selection_index(0);
    }
  };

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
                <div className="flex flex-row items-center">
                  <div className="justify-start flex">
                    <div className="flex items-center justify-center rounded-full h-10 w-40 shadow-lg font-bold">
                      Figma Design
                    </div>
                  </div>
                  <div className="flex">
                    <ArrowLeft
                      onClick={reduce_design_selection_index}
                    ></ArrowLeft>
                    <ArrowRight
                      onClick={increase_design_selection_index}
                    ></ArrowRight>
                  </div>
                </div>
                <div className="bg-[#f8fafc] rounded-lg mt-4 flex items-center justify-center">
                  {visual_test_results.length > 0 && (
                    <img
                      src={`http://localhost:9001/${visual_test_results[current_design_selection_index].page_id}.png`}
                      alt="Image"
                      width={600}
                      height={400}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <div className="flex items-center justify-center rounded-full h-10 w-52 shadow-lg font-bold mt-6">
                  Code Implementation
                </div>
                <div className="bg-[#f8fafc] rounded-lg mt-4 flex items-center justify-center">
                  {visual_test_results.length > 0 && (
                    <img
                      src={`http://localhost:9001/screenshot_${visual_test_results[current_design_selection_index].page_id}.png`}
                      alt="Image"
                      width={600}
                      height={400}
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>
              <div className="mr-4">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Overall fidelity score</CardTitle>
                    <div className="flex items-center gap-x-3">
                      <Progress
                        value={progress}
                        className="transition-all ease-in-out"
                      />{" "}
                      {Math.round(progress)}%
                    </div>
                  </CardHeader>
                </Card>
                <Tabs defaultValue="working">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="working">
                      What&apos;s working
                    </TabsTrigger>
                    <TabsTrigger value="improve">What went wrong</TabsTrigger>
                    <TabsTrigger value="reco">Recommendations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="working">
                    {visual_test_results.length > 0 &&
                      visual_test_results[
                        current_design_selection_index
                      ].working.map((result, index) => (
                        <Card
                          key={`${current_design_selection_index}-${index}`}
                        >
                          <CardHeader>
                            <div className="flex items-center gap-x-3">
                              <CircleCheck className="text-green-500" />
                              <div className="flex flex-col">
                                <CardTitle>{result.title}</CardTitle>
                                <CardDescription>
                                  {result.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                  </TabsContent>
                  <TabsContent value="improve">
                    {visual_test_results.length > 0 &&
                      visual_test_results[
                        current_design_selection_index
                      ].wrong.map((result, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex items-center gap-x-3">
                              <CircleX className="text-red-500" />
                              <div className="flex flex-col">
                                <CardTitle>{result.title}</CardTitle>
                                <CardDescription>
                                  {result.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="ml-8 -mt-4">
                            <Button variant="outline">Highlight Section</Button>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                  <TabsContent value="reco">
                    {visual_test_results.length > 0 &&
                      visual_test_results[
                        current_design_selection_index
                      ].recommendations.map((result, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex items-center gap-x-3">
                              <Info className="text-blue-500" />
                              <div className="flex flex-col">
                                <CardTitle>{result.title}</CardTitle>
                                <CardDescription>
                                  {result.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="ml-8 -mt-4">
                            <Button variant="outline">
                              Commit Recommendation
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
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
                  {functional_test_results.map((result: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-x-3">
                          {result.succeeded ? (
                            <CircleCheck className="text-green-500" />
                          ) : (
                            <CircleX className="text-red-500" />
                          )}
                          <div className="flex flex-col gap-y-1">
                            <CardTitle>{result.page_title}</CardTitle>
                            <CardDescription>
                              {result.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
