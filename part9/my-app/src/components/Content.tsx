import React from "react";
import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ courses }: { courses: Array<CoursePart> }) => {
    return (
        <div>
            {courses.map(part => 
                <Part key={part.name} part={part} />
            )}
        </div>
    );
};

export default Content;