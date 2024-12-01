'use client'
import React, { useRef } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import QuestionDescription from '@/components/practice/QuestionDescription'
import Editor from '@monaco-editor/react';
const PracticePage = () => {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    function showValue() {
        alert(editorRef.current?.getValue());
    }
    return (
        <div>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <QuestionDescription id={1} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <div>
                        <button onClick={showValue}>Show value</button>
                        <Editor
                            height="90vh"
                            defaultLanguage="javascript"
                            defaultValue="// some comment"
                            onMount={handleEditorDidMount}
                            theme='vs-dark'
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    )
}

export default PracticePage