'use client'
import React, { useRef } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import QuestionDescription from '@/components/practice/QuestionDescription'
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
const PracticeWithQuestionId = () => {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    function showValue() {
        alert(editorRef.current?.getValue());
    }
    return (
        // INFINITE SCROLL HAPPENS FOR removing 100vh
        <div className='flex pb-4' style={{ height: `calc(100vh - 62px)` }}>
            <QuestionDescription id={1} />

            <div className='w-[50%]'>
                <Editor
                    height="80%"
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    onMount={handleEditorDidMount}
                    theme='vs-dark'
                />
                
                <button className="p-2 bg-green-500 text-white" onClick={showValue}>Submit</button>
            </div>
        </div>
    )
}

export default PracticeWithQuestionId