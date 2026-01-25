// 10-World Interactive Learning Platform Data Structure
// Based on comprehensive curriculum design
import { LearningWorld, StudentProgress } from './worlds';
import { discoveryIsland } from './worlds/discovery-island';
import { problemPlanet } from './worlds/problem-planet';
import { customerCove } from './worlds/customer-cove';
import { ideaGalaxy } from './worlds/idea-galaxy';

// Export types for compatibility
export type { LearningWorld, StudentProgress, PowerPath, PowerPathActivity } from './worlds';

// Export all worlds
export const learningWorlds: LearningWorld[] = [
    discoveryIsland,
    problemPlanet,
    customerCove,
    ideaGalaxy,
    // world5, world6, world7, world8, world9, world10 - to be added
];

// Helper functions
export const getWorldById = (id: string): LearningWorld | undefined => {
    return learningWorlds.find(w => w.id === id);
};

export const getWorldByNumber = (num: number): LearningWorld | undefined => {
    return learningWorlds.find(w => w.worldNumber === num);
};

export const calculateProgress = (progress: StudentProgress): number => {
    const totalWorlds = learningWorlds.length;
    const completedWorlds = progress.worldsCompleted.length;
    return (completedWorlds / totalWorlds) * 100;
};

export const getNextWorld = (currentWorldId: string): LearningWorld | null => {
    const currentWorld = getWorldById(currentWorldId);
    if (!currentWorld) return null;
    return getWorldByNumber(currentWorld.worldNumber + 1) || null;
};

export const isWorldUnlocked = (worldId: string, progress: StudentProgress): boolean => {
    const world = getWorldById(worldId);
    if (!world) return false;
    if (world.worldNumber === 1) return true;
    const previousWorld = getWorldByNumber(world.worldNumber - 1);
    return previousWorld ? progress.worldsCompleted.includes(previousWorld.id) : false;
};
