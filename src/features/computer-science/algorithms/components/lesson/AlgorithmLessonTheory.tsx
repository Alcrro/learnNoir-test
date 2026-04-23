import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { algorithms } from "../../data/algorithmsData";
import { getFallbackProgrammingCatalog } from "../../../catalog/data/programmingCatalogFallback";
import { buildAlgorithmLessonTheoryModel } from "../../lib/buildAlgorithmLessonTheory";
import "./theorySenior.css";
import { KeyIdeaCard } from "./theory/KeyIdeaCard";
import { StepsCard } from "./theory/StepsCard";
import { ComplexityCard } from "./theory/ComplexityCard";
import { WhenToUseCard } from "./theory/WhenToUseCard";
import { MisconceptionsCard } from "./theory/MisconceptionsCard";
import { PrerequisitesCard } from "./theory/sidebar/PrerequisitesCard";
import { RelatedLessonsCard } from "./theory/sidebar/RelatedLessonsCard";
import { MemoryTipCard } from "./theory/sidebar/MemoryTipCard";
import { NextLessonCard } from "./theory/sidebar/NextLessonCard";

const AlgorithmLessonTheory = () => {
  const { category, lessonId } = useParams<{
    category: string;
    lessonId: string;
  }>();

  const model = useMemo(() => {
    if (!lessonId) return null;
    if (category !== "algorithms" && category !== "data-structures")
      return null;

    const catalog = getFallbackProgrammingCatalog(category);
    const lesson = catalog.lessons.find((l) => l.id === lessonId);
    if (!lesson) return null;

    const algorithmDetail =
      category === "algorithms"
        ? algorithms.find((a) => a.id === lessonId)
        : undefined;

    const groupLessons = catalog.lessons
      .filter((l) => l.group === lesson.group)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const relatedLessons = groupLessons.filter((l) => l.id !== lesson.id);

    return buildAlgorithmLessonTheoryModel({
      lesson,
      algorithmDetail: algorithmDetail
        ? {
            id: algorithmDetail.id,
            group: algorithmDetail.group,
            prerequisites: algorithmDetail.prerequisites,
            estimatedTime: algorithmDetail.estimatedTime,
          }
        : { id: lesson.id },
      relatedLessons,
      allLessonsInGroup: groupLessons,
    });
  }, [category, lessonId]);

  if (!model) return null;

  return (
    <div className="theory-senior">
      <div className="layout">
        {/* ══════════ MAIN CONTENT ══════════ */}
        <div className="main w-full">
          <KeyIdeaCard
            keyIdea={model.keyIdea}
            analogy={
              model.mainCards.find((c) => c.title.startsWith("Analogy"))?.body
            }
          />

          <StepsCard steps={model.steps} />

          <ComplexityCard
            complexityCases={model.complexityCases}
            complexityExplainer={model.complexityExplainer}
          />

          <WhenToUseCard
            whenGood={model.whenGood}
            whenAvoid={model.whenAvoid}
          />

          <MisconceptionsCard misconceptions={model.misconceptions} />
        </div>

        {/* ══════════ SIDEBAR ══════════ */}
        <div className="sidebar">
          {/* Prerequisite map */}
          <PrerequisitesCard
            prerequisites={model.prerequisites}
            prereqNote={model.prereqNote}
          />

          {/* Related lessons */}
          <RelatedLessonsCard relatedLessons={model.relatedLessons} />

          {/* Memory tip */}
          <MemoryTipCard
            title={model.title}
            sidebarCards={model.sidebarCards}
          />

          {/* Next lesson */}
          {model.nextLesson ? (
            <NextLessonCard nextLesson={model.nextLesson} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmLessonTheory;
